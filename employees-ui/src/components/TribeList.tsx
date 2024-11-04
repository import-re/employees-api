import { Await, defer, useLoaderData } from "react-router-dom";
import { Tribe as TribeDTO} from "../../../src/models/tribe"
import Tribe from "./Tribe";
import { Suspense } from "react";

export async function loader() {
  return defer({ tribesPromise: tribesPromise() });
}

async function tribesPromise() {
  const data = await fetch("/api/tribes");
  return await data.json();
}

export default function TribeList() {
  const data = useLoaderData() as { tribesPromise: Promise<TribeDTO[]> };
  return (
    <Suspense fallback={<p>Loading tribes...</p>}>
      <Await
        resolve={data.tribesPromise}
        errorElement={<p>Error loading tribes!</p>}
      >
        {(tribes: TribeDTO[]) => (
          <div className="tribes-container">
            {tribes.map((tribe) => (
              <Tribe key={tribe.tribe_id} tribe={tribe} />
            ))}
          </div>
        )}
      </Await>
    </Suspense>
  );
}

