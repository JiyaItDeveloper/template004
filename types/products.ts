export interface Product{
   _id : string;
   name:string;
   _type :"product";
   image? : {
    asset :{
        _ref : string;
        _type : 'image';

        
    }
   };
   price:number;
   description?: string;
   slug:{
    _type:'slug'
    current:string
   }

   
   stockLevel : number;
};

const descriptionField = {
    name: "description",
    type: "string", // Ensuring consistency for short text fields
    title: "Description",
    description: "Provide a short description (max 150 characters).",
    validation: (Rule: any) =>
      Rule.max(150).warning("Keep the description under 150 characters."),
  };
  