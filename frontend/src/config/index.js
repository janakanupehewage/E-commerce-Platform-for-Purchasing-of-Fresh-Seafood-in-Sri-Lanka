

export const registerFormControls = [
    {
      name: "userName",
      label: "User Name",
      placeholder: "Enter your user name",
      componentType: "input",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      componentType: "input",
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      componentType: "input",
      type: "password",
    },
  ];

  export const LoginFormControls = [
    
    {
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      componentType: "input",
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      componentType: "input",
      type: "password",
    },
  ];

  export const addProductFormElements = [
    {
      label: "Title",
      name: "title",
      componentType: "input",
      type: "text",
      placeholder: "Enter product title",
    },
    {
      label: "Description",
      name: "description",
      componentType: "textarea",
      placeholder: "Enter product description",
    },
    {
      label: "Category",
      name: "category",
      componentType: "select",
      options: [
        { id: "fish", label: "Fish" },
        { id: "shellfish", label: "Shellfish" },
        { id: "cephalopods", label: "Cephalopods" },
        { id: "mollusks", label: "Mollusks" },
        { id: "driedandsaltedseafood", label: "Dried & Salted Seafood" },
      ],
    },
    
    {
      label: "Price",
      name: "price",
      componentType: "input",
      type: "number",
      placeholder: "Enter product price",
    },
    {
      label: "Sale Price",
      name: "salePrice",
      componentType: "input",
      type: "number",
      placeholder: "Enter sale price (optional)",
    },
    {
      label: "Total Stock",
      name: "totalStock",
      componentType: "input",
      type: "number",
      placeholder: "Enter total stock",
    },
  ];

  export const shoppingViewHeaderMenuItems = [
    {
      id : 'home',
      label : 'Home',
      path : '/shop/home'
    },
    {
      id : 'aboutUs',
      label : 'About Us',
      path : '/shop/about'
    },
    {
      id : 'seaFoodProducts',
      label : 'SeaFood Products',
      path : '/shop/listing'
    },{
      id : 'contact',
      label : 'Contact',
      path : '/shop/contact'
    },
    {
      id : 'search',
      label : 'Search',
      path : '/shop/search'
    },
    {
      id : 'prediction',
      label : 'Prediction',
      path : '/shop/prediction'
    },
    {
      id : 'calculate-nutrients',
      label : 'Nutrients Insights',
      path : '/shop/calculate-nutrients'
    },
  ];

  export const categoryOptionsMap = {
    fish: "Fish",
    shellfish: "Shellfish",
    cephalopods: "Cephalopods",
    mollusks: "Mollusks",
    driedandsaltedseafood: "driedandsaltedseafood",
  };

  export const filterOptions = {
    category: [
      { id: "fish", label: "Fish" },
      { id: "shellfish", label: "Shellfish" },
      { id: "cephalopods", label: "Cephalopods" },
      { id: "mollusks", label: "Mollusks" },
      { id: "driedandsaltedseafood", label: "Dried & Salted Seafood" },
    ],
  };

  export const sortOptions = [
    { id: "price-lowtohigh", label: "Price: Low to High" },
    { id: "price-hightolow", label: "Price: High to Low" },
    
  ];

  export const addressFormControls = [
    {
      label: "Address",
      name: "address",
      componentType: "input",
      type: "text",
      placeholder: "Enter your address",
    },
    {
      label: "City",
      name: "city",
      componentType: "input",
      type: "text",
      placeholder: "Enter your city",
    },
    {
      label: "Postal Code",
      name: "postalcode",
      componentType: "input",
      type: "text",
      placeholder: "Enter your area postalcode",
    },
    {
      label: "Phone",
      name: "phone",
      componentType: "input",
      type: "text",
      placeholder: "Enter your phone number",
    },
    {
      label: "Notes",
      name: "notes",
      componentType: "textarea",
      placeholder: "Enter any additional notes",
    },
  ];
