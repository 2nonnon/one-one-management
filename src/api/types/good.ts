import { ICategory } from './category'
export interface IAttribute {
    id: number;
    name: string;
    parentId: number;
  }
export interface ISku {
    id?: number;
    name: string;
    img_url: string;
    market_price: number;
    price: number;
    sold: number;
    stock: number;
    attributes: IAttribute[];
}
export interface IGood {
    id: string;
    cover_url: string;
    market_price: number;
    price: number;
    name: string;
    tag: number;
    total_stock: number;
    sold: number;
    sale_time: string;
    categories: ICategory[];
  }

export enum Sort {
    TIME = 'time',
    SOLED = 'soled',
    PRICE = 'price',
    PRICE_DES = '-price',
  }
export interface CreateGoodDto {
    cover_url: string;
    banner: string[];
    detail: string[];
    market_price: number;
    price: number;
    name: string;
    tag: number;
    total_stock: number;
    categories: ICategory[];
    skus: ISku[];
  }
export interface IGoodsPage {
    total: number;
    goods: IGood[];
  }
export interface IGoodDetail extends IGood {
    attributes: { [Propname: string]: string[] };
    skus: ISku[];
  }
export interface GetGoodsPageDto {
    search?: string;
    current_page: number;
    page_size: number;
    category?: number;
    sort?: Sort;
  }
