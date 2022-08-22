import { verify } from "https://deno.land/x/djwt@v2.2/mod.ts";

const SUPABASE_JWT_SECRET = Deno.env.get("SUPABASE_JWT_SECRET");
const SUPABASE_API_SECRET = Deno.env.get("SUPABASE_API_SECRET");

const URL = Deno.env.get("GRAPHQL_SUPABASE_URL");

const GET_PROFILE_QUERY = `query ($sub: UUID) {
  profilesCollection(filter: { user_id: { eq: $sub}}) {
    edges {
      node {
        email,
        name,
        image
      }
    }
  }
}`;

const CREATE_PROFILE_QUERY = `mutation($sub: UUID, $email: String) {
  insertIntoprofilesCollection(objects: {
    email: $email,
    image: "",
    name: "",
    user_id: $sub

  }){
    records {
      image
      email
      name
    }
  }
}
`;

const UPDATE_PROFILE_QUERY = `mutation($sub: UUID, $email: String, $image: String, $name: String) {
  updateprofilesCollection(set: {
    email: $email,
    image: $image,
    name: $name,
    user_id: $sub
    
  }){
    records {
      image
      email
      name
    }
  }
}
`;

const getProfile = async (sub) => {
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apiKey: SUPABASE_API_SECRET,
    },
    body: JSON.stringify({
      query: GET_PROFILE_QUERY,
      variables: {
        sub: sub,
      },
    }),
  });

  const { data, error } = await response.json();
  if (error) return new Response(JSON.stringify({ error }));
  console.log(sub);
  console.log(data);

  const {
    profilesCollection: { edges },
  } = data;
  if (!edges || edges.length < 1) return null;

  const [
    {
      node: { email, name, image },
    },
  ] = edges;

  return { email, name, image };
};

const createProfile = async (sub, email) => {
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apiKey: SUPABASE_API_SECRET,
    },
    body: JSON.stringify({
      query: CREATE_PROFILE_QUERY,
      variables: {
        sub,
        email,
      },
    }),
  });

  const { data } = await response.json();
  const {
    insertIntoprofilesCollection: { records },
  } = data;
  return records;
};

const updateProfile = async (sub, body) => {
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apiKey: SUPABASE_API_SECRET,
    },
    body: JSON.stringify({
      query: UPDATE_PROFILE_QUERY,
      variables: {
        sub,
        email: body.email,
        name: body.name,
        image: body.image,
      },
    }),
  });

  const { data } = await response.json();
  const {
    updateprofilesCollection: { records },
  } = data;
  return records;
};

const endpoint = async (req) => {
  if (!req.headers.has("Authorization")) {
    return new Response(JSON.stringify({ error: "No Auth token" }));
  }

  const [, token] = req.headers.get("Authorization").split(" ");
  const user = await verify(token, SUPABASE_JWT_SECRET, "HS256");
  const bodyString = req.text();
  if (!user) return Response(JSON.stringify({ error: "Invalid Auth token" }));
  const profile = await getProfile(user.sub);

  if (profile && bodyString) {
    const body = JSON.parse(bodyString);
    const updateResponse = await updateProfile(user.sub, {
      ...profile,
      ...body,
    });
    return new Response(JSON.stringify(updateResponse));
  }

  if (profile) return new Response(JSON.stringify(profile));
  const createResponse = await createProfile(user.sub, user.email);
  return new Response(JSON.stringify(createResponse));
};

export default endpoint;
