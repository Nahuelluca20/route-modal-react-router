import { json, LoaderFunctionArgs, useLoaderData } from "react-router";

interface InfoData {
  data: string;
}

export async function infoLoader({ request }: LoaderFunctionArgs) {
  console.log(request);
  return json<InfoData>({ data: "saasa" });
}

export default function Info() {
  const data = useLoaderData() as InfoData;
  return <div>info {data.data}</div>;
}
