export const verifyKaryawan = async (token: string) => {
    try {

        // cek pada env
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/employee/me`

        // fetch sama seperti axios, axios tidka berlaku jadi menggunakan fetch
        const result = await fetch(url, {
            method: "GET",
            headers: {
                authorization: `Bearer ${token}`,
                "app-key": process.env.NEXT_PUBLIC_APP_KEY || ""
            }
        });
        
        const data: any = await result.json();
        console.log(data);
        
        return data.success;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const verifyPelanggan = async (token: string) => {
    try {

        // cek pada env
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/customer/me`

        // fetch sama seperti axios, axios tidka berlaku jadi menggunakan fetch
        const result = await fetch(url, {
            method: "GET",
            headers: {
                authorization: `Bearer ${token}`,
                "app-key": process.env.NEXT_PUBLIC_APP_KEY || ""
            }
        });
        
        const data: any = await result.json();
        console.log(data);
        
        return data.success;
    } catch (error) {
        console.error(error);
        return false;
    }
}