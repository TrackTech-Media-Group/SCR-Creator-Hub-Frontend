import { useSwrWithUpdates } from "@creatorhub/swr";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

export interface AdminDashboardStatsResponse {
	uptime: number;
	cpu: number;
	memory: {
		usage: number;
		total: number;
	};
}

export interface AdminDashoardTagsResponse {
	id: string;
	name: string;
	stats: {
		image: number;
		video: number;
		music: number;
	};
}

/**
 * A Hook which provides real-time server stats
 */
export const useAdminServerStats = () => {
	const [stats, setStats] = useState<AdminDashboardStatsResponse>({ cpu: 0, memory: { total: 0, usage: 0 }, uptime: 0 });

	const Authorization = getCookie("CH-SESSION");
	const fetcher = (url: string) =>
		axios.get(`${process.env.NEXT_PUBLIC_API_URL}${url}`, { headers: { Authorization: `User ${Authorization}` } }).then((res) => res.data);

	const { data: statsData } = useSwrWithUpdates<AdminDashboardStatsResponse>("/v1/admin/dashboard", undefined, fetcher);
	useEffect(() => {
		if (statsData) setStats(statsData);
	}, [statsData]);

	return stats;
};

/**
 * A Hook which provides real-time server tag information
 */
export const useAdminTagStats = () => {
	const [stats, setStats] = useState<AdminDashoardTagsResponse[]>([]);

	const Authorization = getCookie("CH-SESSION");
	const fetcher = (url: string) =>
		axios.get(`${process.env.NEXT_PUBLIC_API_URL}${url}`, { headers: { Authorization: `User ${Authorization}` } }).then((res) => res.data);

	const { data: statsData } = useSwrWithUpdates<AdminDashoardTagsResponse[]>("/v1/admin/tags", undefined, fetcher);
	useEffect(() => {
		if (statsData) setStats(statsData);
	}, [statsData]);

	return stats;
};
