export default{
    name: 'order',
    type: 'document',
    title: 'Order',
    fileds:[
        {
            name:'firstName',
            title:'First Name',
            type:'string'
        },
        {
            name:'lastName',
            title:'Last Name',
            type:'string'
        },
{
            name:'email',
            title:'Email',
            type:'string'
        },
        {
            name:'phone',
            title:'Phone',
            type:'string'
        },
        {
            name:'address',
            title:'Address',
            type:'string'
        },
        {
            name:'city',
            title:'City',
            type:'string'
        },
        {
            name:'zip',
            title:'Zip',
            type:'string'
        },
        {
            name:'country',
            title:'Country',
            type:'string'
        },
        {
            name:'paymentMethod',
            title:'Payment Method',
            type:'string'
        },
        {
            name:'products',
            title:'Products',
            type:'array',
            of:[
                {
                    type:'object',
                    fields:[
                        {
                            name:'product',
                            title:'Product',
                            type:'reference',
                            to:[{type:'product'}]
                        },
                        {
                            name:'quantity',
                            title:'Quantity',
                            type:'number'
                        },
                        {
                            name:'price',
                            title:'Price',
                            type:'number'
                        },
                        {
                            name:'total',
                            title:'Total',
                            type:'number'
                        },
                        {
                            status:'status',
                            title:'Order Status',
                            type:'string',
                            options:{
                                list:[
                                    {title:'Pending', value:'pending'},
                                    {title:'Processing', value:'processing'},
                                    {title:'Shipped', value:'shipped'},
                                    {title:'Delivered', value:'delivered'},
                                    {title:'Canceled', value:'canceled'}
                                ],
                                layout:'radio'
                            },
                            initialValue:'pending'
                        }
                    ]
                }
            ]
}

    ]
}