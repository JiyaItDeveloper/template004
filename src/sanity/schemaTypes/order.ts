// export default {
//     name: 'order',
//     type: 'document',
//     title: 'Order',
//     fields: [
//         {
//             name: 'firstName',
//             title: 'First Name',
//             type: 'string'
//         },
//         {
//             name: 'lastName',
//             title: 'Last Name',
//             type: 'string'
//         },
//         {
//             name: 'email',
//             title: 'Email',
//             type: 'string'
//         },
//         {
//             name: 'phone',
//             title: 'Phone',
//             type: 'number'
//         },
//         {
//             name: 'address',
//             title: 'Address',
//             type: 'string'
//         },
//         {
//             name: 'city',
//             title: 'City',
//             type: 'string'
//         },
//         {

//             name: 'zipCode',
//             title: 'Zip Code',
//             type: 'string'
//         },

//         {
//             name: 'orderDate',
//             title: 'Order Date',
//             type: 'string',
//         },
//         {
//             name: 'discount',
//             title: 'Discount',
//             type: 'number'
//         },


//         {
//             name: 'cartItems',
//             title: 'Cart Items',
//             type: 'array',
//             to: [
//                 {
//                     type: 'reference', to: { type: 'product' }
//                 }]
//         },
//         {
//             name: 'total',
//             title: 'Total',
//             type: 'number'
//         },
       
//     ]
// }



import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'order',
  type: 'document',
  title: 'Order',
  fields: [
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string'
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string'
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string'
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string'
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string'
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string'
    }),
    defineField({
      name: 'zipCode',
      title: 'Zip Code',
      type: 'string'
    }),
    defineField({
      name: 'orderDate', // Corrected the mistake (previously "order")
      title: 'Order Date',
      type: 'datetime'
    }),
    defineField({
      name: 'discount',
      title: 'Discount',
      type: 'number'
    }),
    defineField({
      name: 'cartItems',
      title: 'Cart Items',
      type: 'array', // Changed to array to handle multiple items
      of: [
        {
          type: 'reference',
          to: { type: 'product' }
        }
      ]
    }),
    defineField({
      name: 'total',
      title: 'Total',
      type: 'number'
    })
  ]
})
