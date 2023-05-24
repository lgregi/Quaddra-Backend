import { Component } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { CadQuadra } from '../cad-quadra.service';


@Component({
  selector: 'app-cadastrar-quadras',
  templateUrl: './cadastrar-quadras.component.html',
  styleUrls: ['./cadastrar-quadras.component.css']
})
export class CadastrarQuadrasComponent {
public imagem:any
constructor(private Cad:CadQuadra){

}

public formulario: FormGroup = new FormGroup({
  'endereco': new FormControl(null),
  'numero': new FormControl(null)
   
})
  public ImagemUpload(event: Event) {
    this.imagem = ((<HTMLInputElement>event.target).files) // retorna um array
  }

  public Armazenar() {
    let teste={
      'endereco':this.formulario.value.endereco,
      'numero':this.formulario.value.numero,
      'imagem':this.imagem[0]
    }
    this.Cad.Salvar(teste)    
  
  }
  public Recuperar(){
    this.Cad.RecuperarQuadras()
    .then((quadras:any) => {
      console.log(quadras)
    })
  }
}
