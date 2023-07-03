import useSWR from 'swr';
import config from '../config';
import { FetchData, HttpMethod, IJob, JobFormValue } from '../types';
import { mutate } from "swr"

const API_BASE_URL = config.apiUrl;

const fetcher = async <T>(url: string, options: RequestInit = {}): Promise<T> => {

    if (!options.method) {
        options.method = HttpMethod.GET;
    }

    const response = await fetch(url, { ...options });
    await delay(5000);

    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }

    const data: T = await response.json();
    console.log(data)
    return data;
};

export const useFetchJobs = (): FetchData<IJob[]> => {
    const url = API_BASE_URL + '/api/jobs';
    const { data, error, isLoading } = useSWR(url, (url) => fetcher<{
        data: IJob[]
    }>(url));

    return {
        data: data?.data || null,
        isLoading,
        error,
    };
};

export const mutateAllJobs = async () => {    
    mutate(API_BASE_URL + '/api/jobs')
}

export const mutateJobById = async (jobId: string) => {
    await mutate(`${API_BASE_URL}/api/jobs/${jobId}`);
}

export const useFetchJobById = (jobId: string): FetchData<IJob | null> => {

    if (!jobId) {
        throw new Error('Failed to fetch data');
    }

    const url = `${API_BASE_URL}/api/jobs/${jobId}`;

    const { data, error, isLoading } = useSWR(url,
        (url) => fetcher<{
            data: IJob
        }>(url)
    );

    return {
        data: data?.data || null,
        isLoading,
        error,
        mutate
    };
};

export const getAIJobDescription = async (jobId: string, language: string) => {

    if (!jobId) {
        throw new Error('Failed to fetch data');
    }

    const url = `${API_BASE_URL}/api/jobs/${jobId}/aidescription/${language}`;

    const response = await fetcher<{
        data: string
    }>(url);

    console.log(response);
    return response.data;
};

export const updateJob = async (jobId: string, jobData: JobFormValue) => {

    const url = `${API_BASE_URL}/api/jobs/${jobId}`;

    const payload = jobData;
    
    if (payload.id) {
        delete payload.id;
    }    
  
    const response = await fetcher<{
        data: IJob
    }>(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    await mutateJobById(jobId);
    await mutateAllJobs();
};

// export const createJob = async (jobData) => {
//   const response = await fetch(API_BASE_URL, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(jobData),
//   });

//   if (!response.ok) {
//     throw new Error('Failed to create job');
//   }
// };

// export const updateJob = async (jobId, jobData) => {
//   const response = await fetch(`${API_BASE_URL}/${jobId}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(jobData),
//   });

//   if (!response.ok) {
//     throw new Error('Failed to update job');
//   }
// };

export const deleteJob = async (jobId: string) => {
    const url = `${API_BASE_URL}/api/jobs/${jobId}`;

    const response = await fetcher<{
        result: boolean
    }>(url, {
        method: 'DELETE',
    });

    mutateAllJobs();
};


function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
