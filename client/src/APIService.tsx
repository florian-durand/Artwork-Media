export default class APIService {
    static InsertArticle(body) {
        return fetch('/update-artwork',
            {
                'method': 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            }).then(res => res.json()).catch(error => console.log(error))
    }

    static InsertEmptyArticle(body) {
        return fetch('/add-empty-artwork',
            {
                'method': 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            }).then(res => res.json()).catch(error => console.log(error))
    }

}