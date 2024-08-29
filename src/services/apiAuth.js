import supabase, { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName: fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user ?? null;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ fullName, password, avatar }) {
  let updateData;

  if (fullName) {
    updateData = { data: { fullName } };
  }

  if (password) {
    updateData = { password };
  }

  // update data
  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);

  if (!avatar) return data;

  const imageName = `avatar-${data.user.id}-${Math.random()}-${avatar.name}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(imageName, avatar);

  if (storageError) throw new Error(storageError.message);

  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${imageName}`,
    },
  });

  if (error2) throw new Error(error2.message);

  return updatedUser;
}
