import api from "@/api";

export async function createObjectUrlMap(obj: any) {
    let object: any = obj || {};
    for (let [key, value] of Object.entries(object)) {
        if (typeof value === 'object') {
            object[key] = await createObjectUrlMap(value);
        }

        if (value instanceof File) {
            const fileObj: File = value;
            object[key] = await uploadFile(fileObj);
        }
    }
    return object;
}

export const uploadFile = async (f: File) => {
    const formData = new FormData();
    formData.append('file', f);
    const { data } = await api.post('/data/upload', formData);
    return data.fileUrl;
};