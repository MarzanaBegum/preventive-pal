import adminAuth from '@/hooks/AdminAuthenticate'
import { GetServerSideProps } from 'next'

function AdminPage() {
    return (
        <div>AdminPage</div>
    )
}

export default AdminPage

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    try {
        const verify = adminAuth({ req, res })
        if (!verify) throw new Error();
        return {
            redirect: {
                destination: "/admin/dashboard",
                permanent: false
            }
        }
    } catch (err) {
        return {
            redirect: {
                destination: "/admin/login",
                permanent: false
            }
        }
    }
}