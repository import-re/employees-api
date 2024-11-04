import { Tribe as TribeDetails } from "../../../src/models/tribe"

export default function Tribe({ tribe }: { tribe: TribeDetails }) {
    return (
        <>
        <p>{tribe.tribe_name}</p>
        </>
    )
}