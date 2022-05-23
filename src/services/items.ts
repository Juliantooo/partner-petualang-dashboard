

import { db } from '../../firebase/clientApp'
import { collection, query, getDocs, addDoc, setDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../../firebase/clientApp';
import { IEditItemsProps, IItem } from '../libs/utils/interfaces';

type IHandleAddItem = IItem

export const getAllItems = async () => {
    const q = query(collection(db, "items"));
    const querySnapshot = await getDocs(q);
    const itemsData: any = []
    querySnapshot.forEach((doc) => {
        const item = {
            id: doc.id,
            ...doc.data()
        }
        itemsData.push(item)
    });
    return itemsData
}


export const addItems = async ({ name, price, stock, category, discount, description, image }: IHandleAddItem) => {
    const imageFileName = `${name?.replace(/\s+/g, '')}-image.jpg`
    const storageRef = ref(storage, imageFileName);
    const metadata = {
        contentType: 'image/jpeg',
    };
    await uploadBytes(storageRef, image, metadata).then((snapshot) => {
        return getDownloadURL(snapshot.ref)
    }).then((imageUrl) => {
        addDoc(collection(db, "items"), {
            name,
            category: category,
            price: price,
            stock: stock,
            discount: discount,
            description: description,
            image: imageUrl,
        });
    })
}

export const updateItem = async ({ name, price, stock, discount, category, description, image, editItemId }: IEditItemsProps) => {
    const imageFileName = `${name?.replace(/\s+/g, '')}-image.jpg`
    const storageRef = ref(storage, imageFileName);
    const metadata = {
        contentType: 'image/jpeg',
    };
    await uploadBytes(storageRef, image, metadata).then((snapshot) => {
        return getDownloadURL(snapshot.ref)
    }).then((imageUrl) => {
        setDoc(doc(db, "items", editItemId), {
            name,
            price,
            stock,
            discount,
            description,
            category,
            image: imageUrl,
        });
    })
}

