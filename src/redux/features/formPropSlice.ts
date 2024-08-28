import { FieldDataType, FormDataType } from "@customTypes/formProp.type";
import { RootState } from "@redux/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  editFormData,
  loadFormData,
  saveFormData,
  updateViewCount,
} from "@utils/firestoreActions";
import { format } from "date-fns";

const now = new Date();

// Initial State for Form Properties
const initialState: FormDataType = {
  formName: "",
  dateCreated: format(now, "dd MMM yyyy"),
  timeCreated: format(now, "hh:mm a"),
  fieldData: [],
  viewCount: 0,
  submitCount: 0,
  isUrl: true,
  url: "",
  isSpecificDate: false,
  specificDate: "",
  isSpecificTime: false,
  specificTime: "",
  numFields: 0,
  selectedField: "",
  isPublished: false,
  shakeUrlInput: false,
  submissions: [],
};

// Form reducer actions
const formPropSlice = createSlice({
  name: "formProp",
  initialState,
  reducers: {
    addField: (state, action: PayloadAction<FieldDataType>) => {
      if (state.fieldData.length < 7) {
        state.fieldData.push(action.payload);
        state.numFields = state.fieldData.length;
      }
    },
    deleteField: (state, action: PayloadAction<string>) => {
      state.fieldData = state.fieldData.filter(
        (field) => field.id !== action.payload,
      );
      state.numFields = state.fieldData.length;
    },
    updateField: (
      state,
      action: PayloadAction<{ id?: string; updates: Partial<FieldDataType> }>,
    ) => {
      const index = state.fieldData.findIndex(
        (field) => field.id === action.payload.id,
      );
      if (index !== -1) {
        state.fieldData[index] = {
          ...state.fieldData[index],
          ...action.payload.updates,
        };
      }
    },
    setSelectedField: (state, action: PayloadAction<string>) => {
      state.selectedField = action.payload;
    },
    toggleUrl: (state) => {
      state.isUrl = !state.isUrl;
    },
    toggleSpecificDate: (state) => {
      state.isSpecificDate = !state.isSpecificDate;
    },
    toggleSpecificTime: (state) => {
      state.isSpecificTime = !state.isSpecificTime;
    },
    setUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
    setSpecificDate: (state, action: PayloadAction<string>) => {
      state.specificDate = action.payload;
    },
    setSpecificTime: (state, action: PayloadAction<string>) => {
      state.specificTime = action.payload;
    },
    handleFormName: (state, action: PayloadAction<string>) => {
      state.formName = action.payload;
    },
    setIsPublished: (state, action: PayloadAction<boolean>) => {
      state.isPublished = action.payload;
    },
    resetFormData: (state) => {
      Object.assign(state, initialState);
    },
    setShakeUrlInput: (state, action: PayloadAction<boolean>) => {
      state.shakeUrlInput = action.payload;
    },
    setFormState: (state, action: PayloadAction<FormDataType>) => {
      return { ...state, ...action.payload };
    },
    setFieldData: (state, action: PayloadAction<FieldDataType[]>) => {
      state.fieldData = action.payload;
      state.numFields = state.fieldData.length;
    },
    incrementViewCount: (state) => {
      state.viewCount += 1;
    },
  },
});

// Thunk to publish form data
export const publishForm = createAsyncThunk<void, string, { state: RootState }>(
  "formProp/saveForm",
  async (formId, { getState, dispatch }) => {
    dispatch(setIsPublished(true));
    const formProp = getState().formProp;
    console.log(formProp);
    await saveFormData(formProp, formId);
  },
);

// Thunk to save form data
export const saveForm = createAsyncThunk<void, string, { state: RootState }>(
  "formProp/editForm",
  async (formId, { getState }) => {
    const formProp = getState().formProp;
    await editFormData(formId, formProp);
  },
);

//Thunk to load form data
export const loadForm = createAsyncThunk<void, string, { state: RootState }>(
  "formProp/loadForm",
  async (formId, { dispatch }) => {
    try {
      const formData = await loadFormData(formId);
      if (formData) {
        dispatch(setFormState(formData));
      } else {
        console.error("Form not found");
      }
    } catch (error) {
      console.error("Error loading form:", error);
    }
  },
);

// Thunk to increment view count
export const incrementViewCountAsync = createAsyncThunk<
  void,
  string,
  { state: RootState }
>("formProp/incrementViewCount", async (formId, { dispatch, getState }) => {
  dispatch(incrementViewCount());
  const currentViewCount = getState().formProp.viewCount;
  await updateViewCount(formId, currentViewCount);
});

export const {
  addField,
  deleteField,
  updateField,
  setSelectedField,
  toggleUrl,
  toggleSpecificDate,
  toggleSpecificTime,
  setUrl,
  setSpecificDate,
  setSpecificTime,
  handleFormName,
  setIsPublished,
  resetFormData,
  setShakeUrlInput,
  setFormState,
  setFieldData,
  incrementViewCount,
} = formPropSlice.actions;

export default formPropSlice.reducer;
