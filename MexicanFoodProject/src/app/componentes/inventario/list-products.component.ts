import { Component, ViewChild } from '@angular/core'

import {
  ForceOptionComponentEnum,
  PoDynamicFormComponent,
  PoDynamicFormField,
  PoNotificationService
} from '@po-ui/ng-components'
import { ListProductsService } from './list-products.service'
import { format } from 'date-fns'

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent {
  person = {}
  validateFields: Array<string> = ['exped']
  @ViewChild('dynamicForm', { static: true }) form!: PoDynamicFormComponent

  fields: Array<PoDynamicFormField> = [
    {
      property: 'date',
      label: 'Data',
      type: 'date',
      format: 'dd/mm/yyyy',
      gridColumns: 5,
      gridMdColumns: 5,
      gridSmColumns: 12,
      maxValue: new Date().toISOString(),
      errorMessage: 'Selecione uma data igual ou menor que hoje',
    },
    {
      property: 'exped',
      label: 'Expedição',
      gridColumns: 5,
      gridMdColumns: 5,
      gridSmColumns: 12,
      options: [
        { descri: 'Flores de Corte', cod: "01" },
      ],
      fieldLabel: 'descri',
      fieldValue: 'cod',
      forceOptionsComponentType: ForceOptionComponentEnum.select,
      required: true
    },
    // {
    //   property: 'standard',
    //   label: 'Padão',
    //   gridColumns: 2,
    //   gridMdColumns: 2,
    //   gridSmColumns: 6,
    //   options: [
    //     { descri: 'A1', cod: "1" },
    //     { descri: 'A2', cod: "2" },
    //     { descri: 'B1', cod: "3" },
    //   ],
    //   fieldLabel: 'descri',
    //   fieldValue: 'cod',
    //   forceOptionsComponentType: ForceOptionComponentEnum.select,
    //   disabled: true
    // },
    // {
    //   property: 'quality',
    //   label: 'Qualidade',
    //   gridColumns: 2,
    //   gridMdColumns: 2,
    //   gridSmColumns: 6,
    //   options: [
    //     { descri: 'A1', cod: "1" },
    //     { descri: 'A2', cod: "2" },
    //     { descri: 'B1', cod: "3" },
    //   ],
    //   fieldLabel: 'descri',
    //   fieldValue: 'cod',
    //   forceOptionsComponentType: ForceOptionComponentEnum.select,
    //   disabled: true
    // }
  ]

  columns = [
    { property: 'product', key: true, visible: false },
    { property: 'description', label: 'Produto' },
    { property: 'standard', visible: false },
    { property: 'descriptionstandard', label: 'Padrão', sortable: false  },
    { property: 'quality', label: 'Qualidade', sortable: false  },
    { property: 'balance', label: 'Saldo', type: 'cellTemplate' }
  ]

  items = []

  isHideLoading = true

  constructor(
    public poNotification: PoNotificationService,
    private listProductsService: ListProductsService
  ) {}

  ngOnInit() {
    this.person = {
      date: new Date()
    }
  }

  onClick = () => {
    this.isHideLoading = false
    let data = new Date(this.form.form.value.date)
    this.listProductsService
    .getListProducts(format(data.setDate(data.getDate() + 1), 'yyyyMMdd'), this.form.form.value.exped)
    .subscribe((res: any) => {
      this.isHideLoading = true
      if (res.status === false) {
        this.items = []
        this.poNotification.warning('Não existe produtos nessa data!')
      } else {
        this.items = res.permission[0].items
        this.poNotification.success('Produtos buscados com sucesso!')
      }
    })
  }

}
