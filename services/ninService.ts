export async function verifyNIN(id_number: string) {
  try {
    console.log("KEY EXISTS:", !!process.env.LUMIID_SECRET_KEY);

    const response = await fetch("https://api.lumiid.com/v1/ng/nin-basic/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.LUMIID_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nin: id_number }),
    });

    console.log("STATUS:", response.status);

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("LUMIID FETCH ERROR:", error);
    throw error;
  }
}
