"use server";
import { feedbackSchema } from "@/constants";
import { db } from "@/firebase/admin";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";

export const getInterviewByUserId = async (
  userId: string
): Promise<Interview[] | null> => {
  const interviews = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();
  return interviews.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  }) as Interview[];
};

export const getLatestInterviews = async (
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> => {
  const { userId, limit = 10 } = params;
  const interviews = await db
    .collection("interviews")
    .where("finalized", "==", true)
    .where("userId", "!=", userId)
    .orderBy("createdAt", "desc")
    .limit(limit)
    .get();
  return interviews.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  }) as Interview[];
};

export const getInterviewById = async (
  id: string
): Promise<Interview | null> => {
  const interview = await db.collection("interviews").doc(id).get();
  return { id: interview.id, ...interview.data() } as Interview | null;
};

export const createFeedback = async (params: CreateFeedbackParams) => {
  const { interviewId, transcript, userId } = params;

  try {
    const formattedTranscript = transcript
      .map((item) => {
        return `- ${item.role}: ${item.content}\n`;
      })
      .join("");

    const {
      object: {
        categoryScores,
        areasForImprovement,
        finalAssessment,
        strengths,
        totalScore,
      },
    } = await generateObject({
      model: google("gemini-2.0-flash-001", {
        structuredOutputs: false,
      }),
      schema: feedbackSchema,
      prompt: `
        You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
        Transcript:
        ${formattedTranscript}

        Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
        - **Communication Skills**: Clarity, articulation, structured responses.
        - **Technical Knowledge**: Understanding of key concepts for the role.
        - **Problem-Solving**: Ability to analyze problems and propose solutions.
        - **Cultural & Role Fit**: Alignment with company values and job role.
        - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
        `,
      system:
        "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
    });

    const feedback = await db.collection("feedbacks").add({
      interviewId,
      userId,
      totalScore,
      categoryScores,
      areasForImprovement,
      strengths,
      finalAssessment,
      createdAt: new Date().toISOString(),
    });
    return {
      success: true,
      feedbackId: feedback.id,
    };
  } catch (error) {
    console.error("Error saving feedback", error);
    return {
      success: false,
    };
  }
};

export const getFeedbackByInterviewId = async (
  params: GetFeedbackByInterviewIdParams
): Promise<Feedback | null> => {
  const { interviewId, userId } = params;
  const feedback = await db
    .collection("feedbacks")
    .where("interviewId", "==", interviewId)
    .where("userId", "==", userId)
    .limit(1)
    .get();

  if (feedback.empty) {
    return null;
  }

  const feedbackDoc = feedback.docs[0];
  return {
    id: feedbackDoc.id,
    ...feedbackDoc.data(),
  } as Feedback;
};
