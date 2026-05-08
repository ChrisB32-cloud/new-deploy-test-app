type Person = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
};

async function getPeople(): Promise<Person[]> {
  try {
    const res = await fetch("https://swapi.info/api/people", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch people");
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching people:", error);
    return [];
  }
}

export default async function CoWorkersPage() {
  const people = await getPeople();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <section>
        <h1 className="text-3xl font-bold tracking-tight">Star Wars Characters</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Displaying {people.length} characters from the Star Wars universe.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {people.map((person) => (
            <div
              key={person.url}
              className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-zinc-900">{person.name}</h2>

              <div className="mt-3 space-y-2 text-sm text-zinc-700">
                <div>
                  <span className="font-medium text-zinc-800">Height:</span> {person.height} cm
                </div>
                <div>
                  <span className="font-medium text-zinc-800">Mass:</span> {person.mass} kg
                </div>
                <div>
                  <span className="font-medium text-zinc-800">Hair Color:</span> {person.hair_color}
                </div>
                <div>
                  <span className="font-medium text-zinc-800">Skin Color:</span> {person.skin_color}
                </div>
                <div>
                  <span className="font-medium text-zinc-800">Eye Color:</span> {person.eye_color}
                </div>
                <div>
                  <span className="font-medium text-zinc-800">Birth Year:</span> {person.birth_year}
                </div>
                <div>
                  <span className="font-medium text-zinc-800">Gender:</span> {person.gender}
                </div>
              </div>

              <div className="mt-4 border-t border-zinc-200 pt-3">
                <div className="text-xs font-medium text-zinc-600">
                  Films: {person.films.length} | Vehicles: {person.vehicles.length} | Starships:{" "}
                  {person.starships.length}
                </div>
              </div>
            </div>
          ))}
        </div>

        {people.length === 0 && (
          <div className="mt-6 rounded-lg border border-dashed border-zinc-300 px-3 py-8 text-center text-sm text-zinc-500">
            No characters found.
          </div>
        )}
      </section>
    </main>
  );
}
