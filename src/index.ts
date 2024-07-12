import { IProduct, IProductService } from "./interfaces";

class ProductList implements IProductService {
    private productList: IProduct[] = [];
    id: number = 1;

    createProduct(data: { name: string; price: number; }): IProduct {
        const newProduct: IProduct = {
            id: this.id,
            name: data.name,
            price: data.price,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        this.productList.push(newProduct);
        this.id += 1;
        return newProduct;
    };

    getProducts(): IProduct[] {
        return this.productList;
    };

    findProduct = (id: number): number => {
        return this.productList.findIndex(product => product.id === id);
    }

    getOneProduct(id: number): IProduct | undefined {
        return this.productList[this.findProduct(id)];
    };

    updateProduct(id: number, data: { name?: string; price?: number; }): IProduct  {
        let productIndex: number = this.findProduct(id);

        if (productIndex === -1) {
            throw new Error("Product not found");
        }

        if (data.name !== undefined) {
            this.productList[productIndex].name = data.name;
        }
        
        if (data.price !== undefined) {
            this.productList[productIndex].price = data.price
        }
        
        this.productList[productIndex].updatedAt = new Date();
        return this.productList[productIndex];
    };

    deleteProduct(id: number): { message: string; } {
        this.productList.splice(this.findProduct(id), 1)

        return { message: "Product successfully deleted."}
    }
};

export const productList = new ProductList()
