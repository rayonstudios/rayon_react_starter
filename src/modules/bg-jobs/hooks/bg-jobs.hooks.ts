import { firebase } from "@/lib/firebase/firebase.service";
import { COLLECTIONS } from "@/lib/firebase/firebase.types";
import { useAppSelector } from "@/lib/redux/store";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { BgJobFirestore } from "../types/bg-jobs.types";
import { toDate } from "@/lib/utils/dateTime.utils";

export const useUserBgJobs = () => {
  const [jobs, setJobs] = useState<Array<BgJobFirestore>>([]);
  const [loading, setLoading] = useState(true);
  const user = useAppSelector((state) => state.profile.data);

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(firebase.db, COLLECTIONS.BG_TASKS),
      where("createdBy", "==", user.id),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const jobsData = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: toDate(data.createdAt),
            updatedAt: toDate(data.updatedAt),
            scheduledFor: toDate(data.scheduledFor),
          } as BgJobFirestore;
        });

        setJobs(jobsData);
        setLoading(false);
      },
      (error) => {
        console.error(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user?.id]);

  return { jobs, loading };
};
