import { getCookie } from 'cookies-next';
import { OptionsType } from 'cookies-next/lib/types';
import jwt_decode from 'jwt-decode';

export function useAdminAuth(options?: OptionsType) {
    try {
        const token = getCookie('_evidence', options);
        if (!token) throw Error();
        const decode = jwt_decode<{ id: string }>(token.toString())
        if (!decode) throw Error()
        return decode.id
    } catch (error) {
        return undefined
    }

}

const AdminAuthenticate = useAdminAuth

export default AdminAuthenticate