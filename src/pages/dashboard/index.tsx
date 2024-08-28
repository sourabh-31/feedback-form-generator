import AddNewForm from "@components/dashboard/AddNewForm";
import FeedbackDetailCard from "@components/dashboard/FeedbackDetailCard";
import AppLayout from "@layout/AppLayout";
import { loadAllForms } from "@utils/firestoreActions";
import { useEffect, useState } from "react";
import { FormDataType } from "@customTypes/formProp.type";
import Spinner from "@components/shared/Spinner";

export default function Dashboard() {
  const [forms, setForms] = useState<{ [id: string]: FormDataType } | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchForms() {
      try {
        const data = await loadAllForms();
        setForms(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchForms();
  }, []);

  const filteredForms = forms
    ? Object.entries(forms).filter(([id, _]) => id.startsWith("form-"))
    : [];

  return (
    <AppLayout className="flex flex-wrap gap-x-10 gap-y-16 px-8 py-12">
      {/* Add New Form */}
      <AddNewForm />

      {/* Feedback Detail Cards */}
      {loading ? (
        <div className="flex h-[24rem] w-80 items-center justify-center">
          <Spinner />
        </div>
      ) : (
        filteredForms.map(([id, form]) => (
          <FeedbackDetailCard
            key={id}
            formId={id}
            heading={form.formName}
            submitCount={form.submitCount}
            viewCount={form.viewCount}
            datePublished={form.dateCreated}
          />
        ))
      )}
    </AppLayout>
  );
}
