export interface TribeDetails {
  tribe_id: number;
  tribe_name: string;
  department: string;
}

export default function Tribe({ tribe }: { tribe: TribeDetails }) {
  return (
    <>
      <p>{tribe.tribe_name}</p>
    </>
  );
}
