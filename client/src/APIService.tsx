export default class APIService {
    static InsertArtwork(body) {
        return fetch('/update-artwork',
            {
                'method': 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            }).then(res => res.json()).catch(error => console.log(error))
    }

}