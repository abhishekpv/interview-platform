"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

const FIVE_DAYS = 60 * 60 * 24 * 5;

export const signUp = async ({ email, name, uid }: SignUpParams) => {
  try {
    //get user record from db
    const userRecord = await db.collection("users").doc(uid).get();

    //email already exists
    if (userRecord.exists) {
      return {
        success: false,
        message: "User already exists. Please sign in instead.",
      };
    }

    //creating a new user
    await db.collection("users").doc(uid).set({
      name,
      email,
    });
    return {
      success: true,
      message: "Account created successfully. Please sign in",
    };
  } catch (error: any) {
    console.error("Error creating a user: ", error);

    if (error.code === "auth/email-already-exists") {
      return {
        success: false,
        message: "This email is already in use.",
      };
    }

    return {
      success: false,
      message: "Failed to create an account",
    };
  }
};

export const signIn = async ({ email, idToken }: SignInParams) => {
  try {
    //get user record from db
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord) {
      return {
        success: false,
        message: "User does not exist. Create an account instead.",
      };
    }
    //set session cookie
    await setSessionCookie(idToken);
  } catch (error) {
    console.error("Error loggin in: ", error);
    return {
      success: false,
      message: "Failed to log into an account.",
    };
  }
};

export const setSessionCookie = async (idToken: string) => {
  const cookieStore = await cookies();

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: FIVE_DAYS * 1000,
  });

  //set cookie using next cookie
  cookieStore.set("session", sessionCookie, {
    maxAge: FIVE_DAYS,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
};

//get user from session cookie
export const getCurrentUser = async (): Promise<User | null> => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) {
    return null;
  }
  try {
    //get uid from the session cookie
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    const userRecord = await db
      .collection("users")
      .doc(decodedClaims.uid)
      .get();

    if (!userRecord.exists) {
      return null;
    }

    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const isAuthenticated = async () => {
  const user = await getCurrentUser();

  return !!user;
};

export const getInterviewByUserId = async (
  userId: string
): Promise<Interview[] | null> => {
  const interviews = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();
  return (await interviews).docs.map((doc) => {
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
  return (await interviews).docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  }) as Interview[];
};
