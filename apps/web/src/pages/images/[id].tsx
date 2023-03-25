import { PrimaryButton, TransparentButton, WhiteButton } from "@creatorhub/buttons";
import { MediaDetailsLayout } from "@creatorhub/ui";
import axios, { AxiosError } from "axios";
import { getCookie, setCookie } from "cookies-next";
import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import { toast } from "react-toastify";

interface Footage {
	name: string;
	id: string;
	marked: boolean;
	useCases: string[];
	tags: { id: string; name: string }[];
	preview: string;
	downloads: { name: string; url: string }[];
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;
	const userSession = getCookie("CH-SESSION", { req: ctx.req, res: ctx.res });
	console.log("test");
	const { data: footage } = await axios
		.get<Footage>(`${apiUrl}/footage/${ctx.params!.id}`, {
			headers: { Authorization: `Bearer ${process.env.INTERNAL_API_KEY}`, "X-USER-TOKEN": userSession ?? "" }
		})
		.catch(() => ({ data: null }));
	if (!footage)
		return {
			notFound: true
		};

	if (!userSession)
		return {
			redirect: "/login",
			props: {}
		};
	console.log("test");
	const csrf = await axios.post<{ state: string; token: string }>(`${apiUrl}/user/state`, undefined, {
		headers: { Authorization: `User ${userSession}` }
	});
	if (!csrf.data.token.length)
		return {
			redirect: "/login",
			props: {}
		};

	const [ext, domain] = apiUrl.replace("http://", "").replace("https://", "").split(".").reverse();
	setCookie("XSRF-TOKEN", csrf.data.token, {
		req: ctx.req,
		res: ctx.res,
		domain: process.env.NODE_ENV === "development" ? undefined : `.${domain}.${ext}`
	});

	return {
		props: { footage, csrf: csrf.data.state, loggedIn: true }
	};
};

const ImageDetail: NextPage<{ footage: Footage; csrf: string; loggedIn: boolean }> = ({ footage, csrf: _initCsrf, loggedIn }) => {
	const [showFullImage, setShowFullImage] = useState(false);
	const [csrf, setCsrf] = useState(_initCsrf);
	const [marked, setMarked] = useState(footage.marked);

	const copyText = (text: string) => {
		void navigator.clipboard.writeText(text);
		toast.info("Copied to clipboard");
	};

	const bookmark = async () => {
		let error = "Train seat is taken";
		const promise = async () => {
			try {
				const { data } = await axios.post<{ csrf: string; marked: boolean }>(
					`${process.env.NEXT_PUBLIC_API_URL}/user/bookmark`,
					{ id: footage.id },
					{
						headers: { "XSRF-TOKEN": csrf },
						withCredentials: true
					}
				);
				setCsrf(data.csrf);
				setMarked(data.marked);
			} catch (err) {
				const _error = "isAxiosError" in err ? (err as AxiosError<{ message: string }>).response?.data.message : "";
				error = _error || "Unknown error, please try again later.";
				console.log(`[BOOKMARK]: ${error}`);

				throw new Error();
			}
		};

		await toast
			.promise(promise(), {
				pending: marked ? "Cancelling reservation..." : "Reserving train seat...",
				error,
				success: marked ? "Reservation cancelled." : "Train seat reserved."
			})
			.catch(() => void 0);
	};

	return (
		<MediaDetailsLayout isLoggedIn={loggedIn}>
			<title>Creator Hub - {footage.name}</title>
			<div className={`relative w-full overflow-hidden ${showFullImage ? "h-auto" : "h-96"} grid place-items-center rounded-xl max-md:hidden`}>
				<img loading="lazy" src={footage.downloads[0].url} alt={footage.name} className="rounded-xl w-full" />
				{!showFullImage && (
					<>
						<PrimaryButton type="button" onClick={() => setShowFullImage(true)} className="absolute bottom-2 z-10">
							Show full image
						</PrimaryButton>
						<div className="bg-gradient-to-t from-main absolute bottom-0 w-full h-full" />
					</>
				)}
			</div>
			<div className="rounded-xl max-md:block md:hidden">
				<img loading="lazy" src={footage.downloads[0].url} alt={footage.name} className="rounded-xl w-full" />
			</div>
			<div className="w-full flex flex-col justify-center gap-2">
				<div className="flex justify-between items-center mt-8 max-md:-mt-4">
					<h1 className="text-subtitle max-lg:text-3xl max-md:text-2xl max-sm:text-xl">{footage.name}</h1>
					{loggedIn && (
						<TransparentButton type="button" onClick={bookmark}>
							<i
								className={`${marked ? "fa-solid" : "fa-regular"} fa-bookmark text-3xl max-lg:text-2xl max-md:text-xl max-sm:text-lg`}
							/>
						</TransparentButton>
					)}
				</div>
				<div className="w-full flex gap-2 items-center flex-wrap">
					{footage.tags.map((tag, key) => (
						<TransparentButton
							key={key}
							type="link"
							href={`/tags/${tag.id}`}
							className="glass transition-colors border-2 border-transparent hover:border-white-400 hover:text-white"
						>
							<p className="flex gap-1">
								<span className="text-highlight">#</span> {tag.name}
							</p>
						</TransparentButton>
					))}
				</div>
			</div>
			<div>
				<h2 className="text-xl">Downloads</h2>
				<div className="flex items-center gap-4 flex-wrap">
					{footage.downloads.map((d, k) => (
						<WhiteButton
							key={k}
							type="link"
							target="_blank"
							href={`${d.url}?download=true`}
							className="border-white-400 border hover:border-white-800"
						>
							{d.name}
						</WhiteButton>
					))}
				</div>
			</div>
			<div>
				<h2 className="text-xl">Use cases</h2>
				<p className="text-base">{footage.useCases.join(", ")}</p>
			</div>
			<div className="w-1/2 max-lg:w-3/4 max-md:w-full pb-8">
				<h2 className="text-xl">Contribution</h2>
				<p className="text-base">
					To make sure that SCR Creators Hub keeps running, we kindly ask you to put the following text under the image or in the
					description of your video/post:
				</p>
				<div className="mt-4">
					<h3 className="text-lg">Description</h3>
					<div className="bg-grey p-2 rounded-xl relative mt-1">
						<p className="text-base pr-12">Some content in this post/video was provided by SCR Creators Hub: https://scrcreate.app/</p>
						<TransparentButton
							type="button"
							className="absolute top-0 right-0"
							onClick={() => copyText("Some content in this post/video was provided by SCR Creators Hub: https://scrcreate.app/")}
						>
							<i className="fa-solid fa-copy" />
						</TransparentButton>
					</div>
				</div>
				<div className="mt-4">
					<h3 className="text-lg">Other</h3>
					<div className="bg-grey p-2 rounded-xl relative mt-1">
						<p className="text-base pr-12">Content from SCR Creators Hub: https://scrcreate.app/</p>
						<TransparentButton
							type="button"
							className="absolute top-0 right-0"
							onClick={() => copyText("Content from SCR Creators Hub: https://scrcreate.app/")}
						>
							<i className="fa-solid fa-copy" />
						</TransparentButton>
					</div>
				</div>
			</div>
		</MediaDetailsLayout>
	);
};

export default ImageDetail;
