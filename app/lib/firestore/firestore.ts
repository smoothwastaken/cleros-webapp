// Initialize Firestore

import { app } from "@/app/lib/firebase";
import { getFirestore } from "firebase/firestore";

const db = getFirestore(app);

export default db;
