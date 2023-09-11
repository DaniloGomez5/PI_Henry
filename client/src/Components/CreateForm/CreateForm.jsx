/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ValidateForm from "./ValidateForm";
import NavBar from "../NavBar/NavBar";
import { getDiets, createRecipe } from "../../redux/actions";
import style from "./CreateForm.module.css";


const Form = ({ dietTypes, createRecipe }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (formSubmitted) {
      setFormData({
        title: "",
        summary: "",
        steps: "",
        image: "",
        diets: [],
        healthScore: 0,
      });
      setErrors({});
      setNewStep("");
      setDuplicateDietError("");
      setFormSubmitted(false);
    }
  }, [formSubmitted]);

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    steps: "",
    image: "",
    diets: [],
    healthScore: 0,
  });

  const [errors, setErrors] = useState({ title: "Required field" });
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    getDiets();
  }, [getDiets]);

  const [newStep, setNewStep] = useState("");

  const [duplicateDietError, setDuplicateDietError] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));

    const validationErrors = ValidateForm({
      ...formData,
      [name]: value,
    });
    setErrors(validationErrors);
  };

  const handleAddStep = () => {
    if (newStep.trim() !== "") {
      const updatedSteps = formData.steps + "\n" + newStep;
      setFormData((prevFormData) => ({
        ...prevFormData,
        steps: updatedSteps,
      }));
      setNewStep("");
    }
  };

  const handleRemoveStep = (index) => {
    const stepsArray = formData.steps.split("\n");
    stepsArray.splice(index, 1);
    const updatedSteps = stepsArray.join("\n");

    setFormData((prevFormData) => ({
      ...prevFormData,
      steps: updatedSteps,
    }));
  };

  const handleStepInputChange = (event) => {
    setNewStep(event.target.value);
  };

  const handleAddDiet = (diet) => {
    const lowerCaseDiet = diet.toLowerCase();

    if (formData.diets.includes(lowerCaseDiet)) {
      setDuplicateDietError("Diet already added");
      return;
    }

    setDuplicateDietError("");

    setFormData((prevFormData) => ({
      ...prevFormData,
      diets: [...prevFormData.diets, lowerCaseDiet],
      customDiet: "",
    }));

    const validationErrors = ValidateForm({
      ...formData,
      diets: [...formData.diets, lowerCaseDiet],
    });
    setErrors(validationErrors);
  };

  const handleRemoveDiet = (index) => {
    setFormData((prevFormData) => {
      const updatedDiets = [...prevFormData.diets];
      updatedDiets.splice(index, 1);

      const updatedFormData = {
        ...prevFormData,
        diets: updatedDiets,
      };

      const validationErrors = ValidateForm(updatedFormData);
      setErrors(validationErrors);

      return updatedFormData;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.keys(errors).length === 0) {
      console.log(errors);
      createRecipe(formData);
      setFormSubmitted(true);
      alert("Recipe successfully Created!");
    } else {
      const missingFields = Object.keys(errors).join(", ");
      const errorMessage = `Required to fill in all fields. Missing: ${missingFields}`;
      alert(errorMessage);
    }
  };

  return (
    <div>
      <div className={style.back}>
        <NavBar />
        <div className={style.formCont}>
          <form className={style.form} onSubmit={handleSubmit}>
            <label>Create your recipe</label>
            
        {/* TITLE */}    
            <input className={style.input} name="title" value={formData.title} onChange={handleInputChange} onBlur={handleInputChange} placeholder="Recipe name"/>
            {errors.title && <span className={style.error}>{errors.title}</span>}
        
        {/* SUMMARY */}
            <textarea className={style.textarea} name="summary" value={formData.summary} onChange={handleInputChange} onBlur={handleInputChange} placeholder="Describe your recipe"/>
            {errors.summary && (<span className={style.error}>{errors.summary}</span>)}

        {/* STEPS */}
            {formData.steps.split("\n").filter( (step) => {return (step !== "")} ).map((step, index) => (
              <div key={index}>
                <input className={style.added} type="text" value={step} readOnly/>
                <button className={style.button} type="button" onClick={() => handleRemoveStep(index)}>
                  Remove
                </button>
              </div>
            ))}
            <input className={style.Xinput} type="text" value={newStep} onChange={handleStepInputChange} onBlur={handleStepInputChange} placeholder="Steps"/>
            <button className={style.Xbutton} type="button" onClick={handleAddStep}>
              Add Steps
            </button>
            {errors.steps && (<span className={style.error}>{errors.steps}</span>)}
        
        {/* DIETS */}  
            <select name="diets" value={""} onChange={(event) => handleAddDiet(event.target.value)}>
              <option value="">Select Diet</option>
              {dietTypes.map((diet) => (
                <option key={diet.id} value={diet.name}>
                  {diet.name}
                </option>
              ))}
            </select>
            {formData.diets.map((diet, index) => (
              <div key={index}>
                <input className={style.added} type="text" value={diet} readOnly/>
                <button className={style.button} type="button" onClick={() => handleRemoveDiet(index)}>
                  Remove
                </button>
              </div>
            ))}
            {errors.diets && (<span className={style.error}>{errors.diets}</span>)}
            {duplicateDietError && (<span className={style.error}>{duplicateDietError}</span>)}
        
        {/* IMAGE */}
            <input className={style.input} name="image" value={formData.image} type="text" onChange={handleInputChange} onBlur={handleInputChange} placeholder="Image URL"/>
            {errors.image && (<span className={style.error}>{errors.image}</span>)}
        
        {/* HEALTHSCORE */}
            <input className={style.input} name="healthScore" value={formData.healthScore === 0 ? "" : formData.healthScore} min="1" max="100" type="number" onChange={handleInputChange} onBlur={handleInputChange} placeholder="Health-Score (0 - 100)"/>
            {errors.healthScore && (<span className={style.error}>{errors.healthScore}</span>)}
        
        {/* SUBMIT */}
            <button className={style.Sbutton} type="submit">
              Upload recipe
            </button>
          </form>
        </div>
      </div>
      {successMessage && (<div className="success-message">{successMessage}</div>)}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dietTypes: state.dietTypes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDietTypes: () => dispatch(getDiets()),
    createRecipe: (formData) => dispatch(createRecipe(formData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
