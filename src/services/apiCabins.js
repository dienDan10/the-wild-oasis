import supabase from "./supabase";

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }
  return cabins;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Cannot delete cabin!");
  }

  return data;
}

export async function createEditCabin(newCabin) {
  // https://snghifqfoeilzovekjso.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  // define wheather the cabin is edit or create
  const isEdit = newCabin.id !== undefined;
  let query = supabase.from("cabins");

  const isImageEdit = !newCabin.image?.startsWith?.(
    "https://snghifqfoeilzovekjso.supabase.co"
  );

  const imageName = isImageEdit
    ? `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "")
    : "";
  const imageUrl = !isImageEdit
    ? newCabin.image
    : "https://snghifqfoeilzovekjso.supabase.co/storage/v1/object/public/cabin-images/" +
      imageName;
  // 1. create/edit cabin

  if (!isEdit) {
    // create cabin
    query = query.insert([{ ...newCabin, image: imageUrl }]);
  }

  if (isEdit) {
    // edit cabin
    query = query
      .update({ ...newCabin, image: imageUrl })
      .eq("id", newCabin.id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("Cannot add cabin!");
  }

  // upload image only if user upload or a image
  if (isImageEdit) {
    // 2. upload image
    const { error: uploadImageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    // 3. Delete cabin if there was error upload image
    if (uploadImageError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      console.log(uploadImageError);
      throw new Error("Cabin image could not be uploaded and was not created");
    }
  }

  return data;
}
