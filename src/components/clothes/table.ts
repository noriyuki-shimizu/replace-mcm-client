import { Column } from 'ant-design-vue/types/table/column';
import moment from 'moment';
import {
    Clothes,
    AssistBrand,
    AssistShop,
    AssistGenre
} from '@/store/clothes/type';

export type Record = Pick<
    Clothes,
    'imageLink' | 'genres' | 'buyDate' | 'comment' | 'satisfaction'
> & {
    key?: number;
    brandName: string;
    shopName: string;
    price: string;
    deleted: string;
};

export const getColumns = (
    brands: AssistBrand[],
    shops: AssistShop[],
    genres: AssistGenre[]
): Partial<Column>[] => {
    return [
        {
            title: 'Image',
            dataIndex: 'imageLink',
            key: 'imageLink',
            fixed: 'left',
            scopedSlots: { customRender: 'imageLink' },
            width: 120
        },
        {
            title: 'Brand name',
            dataIndex: 'brandName',
            key: 'brandName',
            filters: brands.map(({ name }) => ({
                text: name,
                value: name
            })),
            onFilter: (value: string, record: Record) =>
                record.brandName === value,
            width: 160
        },
        {
            title: 'Shop name',
            dataIndex: 'shopName',
            key: 'shopName',
            filters: shops.map(({ name }) => ({
                text: name,
                value: name
            })),
            onFilter: (value: string, record: Record) =>
                record.shopName === value,
            width: 160
        },
        {
            // TODO: 絞り込み機能を足すこと
            title: 'Genre',
            key: 'genres',
            dataIndex: 'genres',
            filters: genres.map(({ name }) => ({
                text: name,
                value: name
            })),
            onFilter: (value: string, record: Record) =>
                record.genres.map(genre => genre.name).includes(value),
            scopedSlots: { customRender: 'genres' },
            width: 200
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            sorter: (a: Record, b: Record) =>
                Number(a.price.replace(/,/, '')) -
                Number(b.price.replace(/,/, '')),
            scopedSlots: { customRender: 'price' },
            width: 160
        },
        {
            title: 'Buy date',
            key: 'buyDate',
            dataIndex: 'buyDate',
            sorter: (a: Record, b: Record) => {
                const aBuyDate = moment(a.buyDate);
                const bBuyDate = moment(b.buyDate);
                if (aBuyDate.isSame(bBuyDate)) {
                    return 0;
                }
                return aBuyDate.isSameOrAfter(bBuyDate) ? 1 : -1;
            },
            width: 150
        },
        {
            title: 'Comment',
            key: 'comment',
            dataIndex: 'comment',
            width: 300
        },
        {
            title: 'Satisfaction',
            dataIndex: 'satisfaction',
            key: 'satisfaction',
            sorter: (a: Record, b: Record) => {
                if (a.satisfaction && b.satisfaction) {
                    return a.satisfaction - b.satisfaction;
                }
                return 0;
            },
            scopedSlots: { customRender: 'satisfaction' },
            width: 200
        },
        {
            title: 'Deleted',
            dataIndex: 'deleted',
            filters: [
                { text: 'Deleted', value: 'Deleted' },
                { text: 'Not deleted', value: 'Not deleted' }
            ],
            filterMultiple: false,
            onFilter: (value: string, record: Record) =>
                record.deleted === value,
            width: 150
        },
        {
            title: 'Operation',
            key: 'operation',
            fixed: 'right',
            width: 200,
            scopedSlots: { customRender: 'operation' }
        }
    ];
};

// export const columns: Partial<Column>[] = [
//     {
//         title: 'Image',
//         dataIndex: 'imageLink',
//         key: 'imageLink',
//         fixed: 'left',
//         scopedSlots: { customRender: 'imageLink' },
//         width: 120
//     },
//     {
//         title: 'Brand name',
//         dataIndex: 'brandName',
//         key: 'brandName',
//         scopedSlots: {
//             filterDropdown: 'filterDropdown',
//             filterIcon: 'filterIcon',
//             customRender: 'customRender'
//         },
//         onFilter: (value: string, record: Record) =>
//             record.brandName
//                 .toString()
//                 .toLowerCase()
//                 .includes(value.toLowerCase()),
//         width: 160
//     },
//     {
//         title: 'Shop name',
//         dataIndex: 'shopName',
//         key: 'shopName',
//         scopedSlots: {
//             filterDropdown: 'filterDropdown',
//             filterIcon: 'filterIcon',
//             customRender: 'customRender'
//         },
//         onFilter: (value: string, record: Record) =>
//             record.shopName
//                 .toString()
//                 .toLowerCase()
//                 .includes(value.toLowerCase()),
//         width: 160
//     },
//     {
//         // TODO: 絞り込み機能を足すこと
//         title: 'Genre',
//         key: 'genres',
//         dataIndex: 'genres',
//         scopedSlots: { customRender: 'genres' },
//         width: 200
//     },
//     {
//         title: 'Price',
//         dataIndex: 'price',
//         key: 'price',
//         sorter: (a: Record, b: Record) =>
//             Number(a.price.replace(/,/, '')) - Number(b.price.replace(/,/, '')),
//         scopedSlots: { customRender: 'price' },
//         width: 160
//     },
//     {
//         title: 'Buy date',
//         key: 'buyDate',
//         dataIndex: 'buyDate',
//         sorter: (a: Record, b: Record) => {
//             const aBuyDate = moment(a.buyDate);
//             const bBuyDate = moment(b.buyDate);
//             if (aBuyDate.isSame(bBuyDate)) {
//                 return 0;
//             }
//             return aBuyDate.isSameOrAfter(bBuyDate) ? 1 : -1;
//         },
//         width: 150
//     },
//     {
//         title: 'Comment',
//         key: 'comment',
//         dataIndex: 'comment',
//         width: 300
//     },
//     {
//         title: 'Satisfaction',
//         dataIndex: 'satisfaction',
//         key: 'satisfaction',
//         sorter: (a: Record, b: Record) => {
//             if (a.satisfaction && b.satisfaction) {
//                 return a.satisfaction - b.satisfaction;
//             }
//             return 0;
//         },
//         scopedSlots: { customRender: 'satisfaction' },
//         width: 200
//     },
//     {
//         title: 'Deleted',
//         dataIndex: 'deleted',
//         filters: [
//             { text: 'Deleted', value: 'Deleted' },
//             { text: 'Not deleted', value: 'Not deleted' }
//         ],
//         filterMultiple: false,
//         onFilter: (value: string, record: Record) => record.deleted === value,
//         width: 150
//     },
//     {
//         title: 'Operation',
//         key: 'operation',
//         fixed: 'right',
//         width: 200,
//         scopedSlots: { customRender: 'operation' }
//     }
// ];
