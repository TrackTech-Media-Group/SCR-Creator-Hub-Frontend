import { useSwrWithUpdates } from "@creatorhub/swr";
import { DisplaySection, MediaLayout } from "@creatorhub/ui";
import axios from "axios";
import { getCookie } from "cookies-next";
import type { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;
	const userSession = getCookie("CH-SESSION", { req: ctx.req, res: ctx.res });
	if (!userSession)
		return {
			props: {
				loggedIn: false
			}
		};

	const csrf = await axios.post<{ state: string; token: string }>(`${apiUrl}/user/state`, undefined, {
		headers: { Authorization: `User ${userSession}` }
	});
	if (!csrf.data.token.length)
		return {
			props: {
				loggedIn: false
			}
		};

	return {
		props: { loggedIn: true }
	};
};

interface Props {
	loggedIn: boolean;
}

const ImagesHome: NextPage<Props> = ({ loggedIn }) => {
	const [tags, setTags] = useState<{ id: string; name: string }[]>([]);
	const { data: tagData } = useSwrWithUpdates<{ id: string; name: string }[]>("/tags?type=image");
	useEffect(() => {
		if (tagData) setTags(tagData);
	}, [tagData]);

	return (
		<MediaLayout isLoggedIn={loggedIn}>
			<div className="flex flex-col items-center justify-center gap-y-32 pb-8">
				{tags.map((tag) => (
					<DisplaySection key={tag.id} tag={tag.name} id={tag.id} type="image" />
				))}
			</div>
		</MediaLayout>
	);
};

export default ImagesHome;
