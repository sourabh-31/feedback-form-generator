import Navbar from "@components/demo/Navbar";
import { FormDataType } from "@customTypes/formProp.type";
import { loadAllForms } from "@utils/firestoreActions";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import FormRenderer from "./FormRenderer";

export default function DemoPage() {
  const [forms, setForms] = useState<{ [id: string]: FormDataType } | null>(
    null,
  );

  // Fetch Form data
  useEffect(() => {
    async function fetchForms() {
      try {
        const data = await loadAllForms();
        setForms(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchForms();
  }, []);

  return (
    <div className="flex h-screen flex-col">
      {/* Navigation */}
      <Navbar />

      <FormRenderer forms={forms} />

      <Outlet />
    </div>
  );
}
