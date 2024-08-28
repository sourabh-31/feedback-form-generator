import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { FormDataType } from "@customTypes/formProp.type";
import { db } from "@redux/firebase";
import { toast } from "react-toastify";

// Function to save form data to Firestore with toast notification and error logging
export const saveFormData = async (formData: FormDataType, formId: string) => {
  return toast.promise(
    async () => {
      try {
        const formRef = doc(db, "forms", formId);
        await setDoc(formRef, formData);
      } catch (error) {
        console.error("Error saving form data:", error);
        throw error;
      }
    },
    {
      pending: "Saving form data...",
      success: "Form data saved successfully!",
      error: {
        render({ data }) {
          // When the promise is rejected, data will contain the error
          console.error("Toast error:", data);
          return "Error saving form data";
        },
      },
    },
  );
};

// Function to load all forms from Firestore
export const loadAllForms = async () => {
  try {
    const formsCollection = collection(db, "forms");
    const querySnapshot = await getDocs(formsCollection);
    const forms: { [id: string]: FormDataType } = {};

    querySnapshot.forEach((doc) => {
      forms[doc.id] = doc.data() as FormDataType;
    });
    return forms;
  } catch (error) {
    console.error("Error loading all forms:", error);
    return null;
  }
};

// Function to load form data from Firestore
export const loadFormData = async (formId: string) => {
  try {
    const formRef = doc(db, "forms", formId);
    const docSnap = await getDoc(formRef);
    if (docSnap.exists()) {
      return docSnap.data() as FormDataType;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error loading form data:", error);
  }
};

// Function to delete form data from Firestore with toast notification
export const deleteFormData = async (formId: string) => {
  return toast.promise(
    async () => {
      const formRef = doc(db, "forms", formId);
      await deleteDoc(formRef);
    },
    {
      pending: "Deleting form...",
      success: "Form deleted successfully!",
      error: "Error deleting form",
    },
  );
};

// Function to edit form data in Firestore with toast notification
export const editFormData = async (
  formId: string,
  updatedData: Partial<FormDataType>,
) => {
  return toast.promise(
    async () => {
      const formRef = doc(db, "forms", formId);
      await updateDoc(formRef, updatedData);
    },
    {
      pending: "Updating form data...",
      success: "Form data saved successfully!",
      error: "Error updating form data",
    },
  );
};

export const updateViewCount = async (formId: string, newViewCount: number) => {
  const formRef = doc(db, "forms", formId);
  await updateDoc(formRef, { viewCount: newViewCount });
};
