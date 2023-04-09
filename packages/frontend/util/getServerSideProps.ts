import { User } from "@./common";
import { GetServerSideProps } from "next";
import { authService } from "../context/ApiServiceContext";

export const getServerSideProps: GetServerSideProps = async ({ req: { cookies } }) => {
    const user: User | null = await (
        await authService.getUser({
            headers: {
                Cookie: Object.entries(cookies)
                    .map(([key, value]) => `${key}=${value}`)
                    .join(';'),
            },
        })
    );
    return { props: { user } };
};