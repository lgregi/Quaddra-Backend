import * as firebase from "firebase";

export class CadQuadra {   
    public key:any

    public Salvar(dados: any): void {
        firebase.database().ref(`Quadras`)
            .push({endereco:dados.endereco, numero:dados.numero})
            .then((key) => {
                this.key = key.key
                console.log('salvo')
                firebase.storage().ref().child(`quadras/${this.key}`)
                    .put(dados.imagem)
                    .then((snapshot) => {
                        snapshot.ref.getDownloadURL()
                            .then((url: any) => {
                                console.log(`url da imagem recuperada: ${url}`);
                                firebase.database().ref(`Quadras/${this.key}`)
                                    .update({ 'url': url })
                                    .then(() => {
                                        console.log('Imagem Salva ');
                                    })
                            })

                    })
            })
    }
    public RecuperarQuadras(): Promise<any>{
        return new Promise((resolve, reject)=>{
            firebase.database().ref(`Quadras`)
            .orderByKey()
            .once('value')
            .then((snapshot:any)=>{
                let consulta: Array<any> = []
                snapshot.forEach((child:any)=>{
                    let teste = child.val()
                    consulta.push(teste)
                    resolve(consulta)                    
                })
        })
    })

}
}
