const ValidateForm = (formData) => {
   const errors = {};

   if (formData.title.length < 5) {
      errors.title = "Title must contain at least 5 characters.";
   }
   if (!isNaN(formData.title)) {
      errors.title = "The title cannot be a number.";
   }
   if (!/^(?!(?:.*\d){5})[a-zA-Z\d\s]+$/.test(formData.title)) {
      errors.title = "The title cannot contain more than 4 consecutive digits.";
   }

   if (formData.summary.length < 10) {

      errors.summary = "Description must contain at least 10 characters.";
   }

   if (formData.steps.length === 0) {
      errors.steps = "Add at least 1 step.";
   }

   /* if (
      !/^(http|https):\/\/[^\s/$.?#].[^\s]*\.(jpg|jpeg|png|gif)$/.test(
         formData.image
      )
   ) {
      errors.image = "Add a link to an image (jpg|jpeg|png|gif).";
   } */

   if (formData.healthscore < 1 || formData.healthscore > 100) {
      errors.healthscore = "Healthscore must be between 1 and 100.";
   }

   if (formData.diets.length === 0) {
      errors.diets = "Add at least 1 diet.";
   }

   return errors;
};

export default ValidateForm;
