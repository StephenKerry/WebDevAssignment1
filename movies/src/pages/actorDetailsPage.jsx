import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import ActorDetails from "../components/actorDetails";
import PageTemplate from "../components/templateActorPage";
import { getActor } from "../api/tmdb-api";
import Spinner from "../components/spinner";

const ActorDetailsPage = () => {
  const { id } = useParams();
  const { data: actor, error, isPending, isError } = useQuery({
    queryKey: ["actor", { id: id }],
    queryFn: getActor,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {actor ? (
        <PageTemplate actor={actor}>
          <ActorDetails actor={actor} />
        </PageTemplate>
      ) : (
        <p>Waiting for actor details</p>
      )}
    </>
  );
};

export default ActorDetailsPage;