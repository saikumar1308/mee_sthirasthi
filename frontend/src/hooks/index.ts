import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"

interface Property {
    "description": string,
    "price": number,
    "location": string,
    "buildup_area": number,
    "id": string,
    "selection": string,
    "image": string,
    "amentiies": string,
    "car_parking": boolean,
    "no_bedroooms": number,
    "no_toilets": number,
    "no_kitchens": number,
    "owner": {
        "username": string,
        "mobileNumber": number,
        "id": string,
        "email": string
    }
}

export function  useProperties({ selection }: {selection:string}) {
    const [loading, setLoading] = useState(true)
    const [properties, setProperties] = useState<Property[]>([])

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/property/${selection}`).then(responce => {
            setProperties(responce.data)
            setLoading(false)
        })
    },[selection])

    return { properties, loading}
}

export function  useProperty({ id }: any) {
    const [loading, setLoading] = useState(true)
    const [property, setProperty] = useState<Property>()

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/property/selection/${id}`).then(responce => {
            setProperty(responce.data)
            setLoading(false)
        })
    },[id])

    return { property, loading}
}

export function useAllProperties() {
    const [AllProperties, setAllProperties] = useState<Property[]>([])

    useEffect(() => {
        axios.get(`${BACKEND_URL}}/property`).then(response => {
            setAllProperties(response.data)
        })
    }
    ,[])

    return { AllProperties}
}