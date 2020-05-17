import { DoneUploadFileInfo } from 'ant-design-vue/types/upload';
import { ClothesItem } from '@/store/coordinate/type';

export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export type FormFields = {
    image: DoneUploadFileInfo;
    season: string;
    clothingIds: number[];
};

export type Record = Omit<ClothesItem, 'id' | 'price'> & {
    key: number;
    price: string;
};
