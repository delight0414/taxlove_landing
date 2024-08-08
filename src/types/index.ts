

export type PlatformListType = {
  title: string;
  description: string;
  label: string;
}

export type PlatformDataType = {
  category: string;
  categoryDescription: string;
  link?:string;
  list: PlatformListType[];
};



export type SolutionListType = {
  title: string;
  description: string;
  label: string;
  image:string
  color?:string
}

export type SolutionDataType ={
  category: string;
  categoryDescription: string;
  link?:string;
  list: SolutionListType[];
}
export type SolutionSecondDataType ={
  category: string;
  categoryDescription: string;
  link?:string;
  list: Pick<SolutionListType,'title'|'description'|'image'>[];
}


export type AutoSliderType = {
  id: number;
  title: string;
  color: string;
}

export type CardListType = {
  title: string;
  description: string;
  icon: string;
}

export type CardDataType = {
  category: string;
  categoryDescription: string;
  link?:string;
  list: CardListType[];
};



