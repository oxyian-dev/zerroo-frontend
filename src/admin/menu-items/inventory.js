import {
    IconArrowAutofitDown, IconBrandAbstract,
    IconBuildingWarehouse,
    IconComponents,
    IconCurrencyRupee, IconDimensions, IconEdit, IconExchange, IconLayout2, IconList, IconPalette,
    IconPaperBag,
    IconPhoto,
    IconShape3,
    IconShirt, IconVariable
} from '@tabler/icons';

const inventory = {
    id: 'inventory',
    title: 'Inventory',
    type: 'group',
    roles: ['Admin'],
    caption: 'Items, Stocks & Listing',
    children: [
        {
            id: 'item',
            title: 'Item',
            type: 'collapse',
            children: [
                {
                    id: 'view-item',
                    title: "View Items",
                    type: 'item',
                    url: '/admin/items'
                },
                {
                    id: 'add-item',
                    title: "Add Item",
                    type: 'item',
                    url: '/admin/items/add'
                },
                {
                    id: 'category',
                    title: 'Categories',
                    type: 'collapse',
                    icon: IconLayout2,
                    children: [
                        {
                            id: 'view-categories',
                            title: 'View Categories',
                            type: 'item',
                            url: '/admin/categories/view'
                        },
                        {
                            id: 'add-category',
                            title: 'Add Category',
                            type: 'item',
                            url: '/admin/categories/add'
                        }
                    ]
                },
                {
                    id: 'variants',
                    title: 'Variants',
                    type: 'collapse',
                    icon: IconShape3,
                    children: [
                        {
                            id: 'size',
                            title: 'Size',
                            type: 'collapse',
                            icon: IconDimensions,
                            children: [
                                {
                                    id: 'view-size',
                                    title: 'View Size',
                                    type: 'item',
                                    url: '/admin/variants/size'
                                },
                                {
                                    id: 'add-size',
                                    title: 'Add Size',
                                    type: 'item',
                                    url: '/admin/variants/size/add'
                                }
                            ]
                        },
                        {
                            id: 'color',
                            title: 'Color',
                            type: 'collapse',
                            icon: IconPalette,
                            children: [
                                {
                                    id: 'view-color',
                                    title: 'View Color',
                                    type: 'item',
                                    url: '/admin/variants/color'
                                },
                                {
                                    id: 'add-color',
                                    title: 'Add Color',
                                    type: 'item',
                                    url: '/admin/variants/color/add'
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'item-group',
                    title: 'Item Group',
                    type: 'collapse',
                    icon: IconPaperBag,
                    children: [
                        {
                            id: 'add-item-group',
                            title: 'Add Item Group',
                            type: 'item',
                            url: '/admin/item-groups/add'
                        },
                        {
                            id: 'view-item-group',
                            title: 'View Item Group',
                            type: 'item',
                            url: '/admin/item-groups/view'
                        }
                    ]
                },
                {
                    id: 'specification',
                    title: 'Specifications',
                    type: 'collapse',
                    icon: IconComponents,
                    children: [
                        {
                            id: 'specifications-types',
                            title: 'Types',
                            type: 'collapse',
                            icon: IconVariable,
                            children: [
                                {
                                    id: 'new-specification-type',
                                    title: 'New Specification Type',
                                    url: '/admin/item-specifications/new-type',
                                    type: 'item'
                                },
                                {
                                    id: 'view-specification-types',
                                    title: 'Specification Types',
                                    url: '/admin/item-specifications/types',
                                    type: 'item'
                                }
                            ]
                        },
                        {
                            title: 'Specifications',
                            id: 'specifications',
                            type: 'collapse',
                            icon: IconComponents,
                            children: [
                                {
                                    id: 'view-specifications',
                                    title: 'View Specification',
                                    type: 'item',
                                    url: '/admin/item-specifications/view'
                                },
                                {
                                    id: 'add-specifications',
                                    title: 'Add Specification',
                                    type: 'item',
                                    url: '/admin/item-specifications/add'
                                }
                            ]
                        },
                        {
                            title: 'List',
                            id: 'specification-list',
                            type: 'collapse',
                            icon: IconList,
                            children: [
                                {
                                    id: 'view-specification-list',
                                    title: 'Specification List',
                                    type: 'item',
                                    url: '/admin/item-specifications/list'
                                },
                                {
                                    id: 'create-specification-list',
                                    title: 'Create Specification List',
                                    type: 'item',
                                    url: '/admin/item-specifications/list/create'
                                }
                            ]
                        }
                    ]
                }

            ],
            icon: IconShirt
        },
        {
            id: 'combos-items',
            title: 'Combos Items',
            type: 'collapse',
            icon: IconLayout2,
            children: [
                {
                    id: 'combos',
                    title: 'Combos',
                    type: 'collapse',
                    children: [
                        {
                            id: 'view-combos',
                            title: 'View Combos',
                            type: 'item',
                            url: '/admin/combos'
                        },
                        {
                            id: 'add-combo',
                            title: 'Add Combo',
                            type: 'item',
                            url: '/admin/combos/add'
                        }
                    ]
                },
                {
                    id: 'combo-groups',
                    title: 'Combo Groups',
                    type: 'collapse',
                    children: [
                        {
                            id: 'view-combo-groups',
                            title: 'View Groups',
                            type: 'item',
                            url: '/admin/combos/groups'
                        },
                        {
                            id: 'add-combo-groups',
                            title: 'Add Group',
                            type: 'item',
                            url: '/admin/combos/groups/add'
                        }
                    ]
                }
            ]
        },
        {
            id: 'price-list',
            title: 'Price List',
            type: 'collapse',
            icon: IconCurrencyRupee,
            children: [
                {
                    id: 'view-price-list',
                    title: 'View Price List',
                    type: 'item',
                    url: '/admin/price-list/view'
                },
                {
                    id: 'add-price-list',
                    title: 'Add Price List',
                    type: 'item',
                    url: '/admin/price-list/add'
                }
            ]
        },
        {
            id: 'image-list',
            title: 'Image Lists',
            type: 'item',
            url: '/admin/image-lists',
            icon: IconPhoto
        },
        {
            id: 'stock',
            title: 'Stocks',
            type: 'collapse',
            icon: IconComponents,
            children: [
                {
                    id: 'view-stocks',
                    title: 'View Stock',
                    type: 'item',
                    url: '/admin/stocks?filterColumn=Quantity&filterOperator=>&filterValue=0'
                },
                {
                    id: 'inwards',
                    title: 'Inward',
                    type: 'collapse',
                    icon: IconArrowAutofitDown,
                    children: [
                        {
                            id: 'view-inward',
                            title: 'View Inward',
                            type: 'item',
                            url: '/admin/stocks/inward/view'
                        },
                        {
                            id: 'add-inward',
                            title: 'New Inward',
                            type: 'item',
                            url: '/admin/stocks/inward/add'
                        }
                    ]
                },
                {
                    id: 'stock-adjustment',
                    title: 'Adjustment',
                    type: 'collapse',
                    icon: IconEdit,
                    children: [
                        {
                            id: 'new-adjustment',
                            title: 'Adjust',
                            type: 'item',
                            url: '/admin/stocks/adjustment/add'
                        },
                        {
                            id: 'view-adjustment',
                            title: 'View',
                            type: 'item',
                            url: '/admin/stocks/adjustment'
                        }
                    ]
                },
                {
                    id: 'stock-transfer',
                    title: 'Stock Transfer',
                    type: 'collapse',
                    icon: IconExchange,
                    children: [
                        {
                            id: 'view-stock-transfer',
                            url: "/admin/stocks/transfer/view",
                            type: 'item',
                            title: 'View Stock Transfer'
                        },
                        {
                            id: 'stock-transfer',
                            url: "/admin/stocks/transfer",
                            type: 'item',
                            title: 'Transfer Stocks'
                        }
                    ]
                }
            ]
        },
        {
            id: 'inventories',
            title: 'Inventories',
            type: 'collapse',
            icon: IconBuildingWarehouse,
            children: [
                {
                    id: 'view-inventories',
                    title: 'View Inventories',
                    type: 'item',
                    url: '/admin/inventories'
                },
                {
                    id: 'add-inventory',
                    title: 'Add Inventory',
                    type: 'item',
                    url: '/admin/add-inventory'
                }
            ]
        },
        {
            id: 'branches',
            title: 'Branches',
            type: 'collapse',
            icon: IconBuildingWarehouse,
            children: [
                {
                    id: 'view-branches',
                    title: 'View Branches',
                    type: 'item',
                    url: '/admin/branches'
                },
                {
                    id: 'add-branch',
                    title: 'Add Branch',
                    type: 'item',
                    url: '/admin/branches/add'
                }
            ]
        },
        {
            id: 'brands',
            title: 'Brands',
            type: 'collapse',
            icon: IconBrandAbstract,
            children: [
                {
                    title: 'View Brands',
                    type: 'item',
                    url: '/admin/brands/view',
                    id: 'view-brand'
                },
                {
                    title: 'Add Brand',
                    type: 'item',
                    url: '/admin/brands/add',
                    id: 'add-brand'
                },
            ],
        },
    ],
};

export default inventory;
