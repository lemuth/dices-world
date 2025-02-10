import { RigidBody } from "@react-three/rapier";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import * as THREE from "three"
import { RollDiceContext } from "@/context/RollDiceContext";
// Dices
import TwelveFaces from "./MeshCpnt/TwelveFaces";
import SixFaces from "./MeshCpnt/SixFaces"
import Piste from "./MeshCpnt/Piste";
import HeightFaces from "./MeshCpnt/HeightFaces";
import TwentyFaces from "./MeshCpnt/TwentyFaces";
import TenFaces from "./MeshCpnt/TenFaces";
import TenFacesDizaine from "./MeshCpnt/TenFacesDizaine";
import FourFaces from "./MeshCpnt/FourFaces";
// Others colliders
import PlaneCollider from "./MeshCpnt/PlaneCollider";
import Cone from "./MeshCpnt/Cone";
import PisteExt from "./MeshCpnt/PisteExt";
import { Html } from "@react-three/drei";

function Dice({ dice, position, rotation, collisionSound, scoreBord, setScoreBord }){

    const rigidBodyRef = useRef();
    const diceGroupRef = useRef()
    const {handleMovingDices} = useContext(RollDiceContext)
    const raycaster = new THREE.Raycaster()

    const faceIndexValue = {
        "d8": {
            0: 3,
            1: 5,
            2: 8,
            3: 2,
            4: 1,
            5: 7,
            6: 6,
            7: 4,
        },
        "d10": {
            19: 1,
            88: 2,
            14: 3,
            79: 4,
            11: 5,
            97: 6,
            12: 7,
            84: 8,
            16: 9,
            93: 10
        },
        "d100": {
            19: 10,
            88: 20,
            14: 30,
            79: 40,
            11: 50,
            97: 60,
            12: 70,
            84: 80,
            16: 90,
            93: 100
        },
        "d12": {
            26: 1,
            32: 2,
            20: 3,
            17: 4,
            23: 5,
            14: 6,
            29: 7,
            8: 8,
            2: 9,
            5: 10,
            35: 11,
            11: 12
        },
        "d20": {
            5: 1,
            8: 2,
            0: 3,
            1: 4,
            18: 5,
            15: 6,
            14: 7,
            2: 8,
            6: 9,
            3: 10,
            11: 11,
            13: 12,
            19: 13,
            7: 14,
            9: 15,
            16: 16,
            4: 17,
            17: 18,
            10: 19,
            12: 20
        }
    }

    // Fonction pour récupérer la face supérieure d'un d4 ou d6
    const getTopFace = (rigidBody, diceType) => {
        if (!rigidBody) return null;

        const rotation = rigidBody.rotation()
        const quaternion = new THREE.Quaternion(rotation.x, rotation.y, rotation.z, rotation.w);

        // Convertir le quaternion en matrice de rotation
        const rotMatrix = new THREE.Matrix4();
        rotMatrix.makeRotationFromQuaternion(quaternion);
    
        // Définir les normales des faces en fonction de l'orientation initiale du dé
        const faceNormals = {
            "d4":{
                1: new THREE.Vector3(0, 1, 0),
                2: new THREE.Vector3(2 * Math.sqrt(2) / 3, -1 / 3, 0),
                3: new THREE.Vector3(-Math.sqrt(2) / 3, -1 / 3, Math.sqrt(6) / 3),
                4: new THREE.Vector3(-Math.sqrt(2) / 3, -1 / 3, -Math.sqrt(6) / 3)
            },
            "d6": {
                1: new THREE.Vector3(0, 1, 0),
                6: new THREE.Vector3(0, -1, 0),
                3: new THREE.Vector3(1, 0, 0),
                4: new THREE.Vector3(-1, 0, 0),
                2: new THREE.Vector3(0, 0, 1),
                5: new THREE.Vector3(0, 0, -1)
            }
        };
        
        let topFace = null;
        let maxDot = -Infinity;
        
        // Pour chaque face, on transforme la normale et on calcule le produit scalaire avec l'axe Y positif
        for (const [face, normal] of Object.entries(faceNormals[diceType])) {
            const transformedNormal = normal.clone().applyMatrix4(rotMatrix);
            const dot = transformedNormal.dot(new THREE.Vector3(0, 1, 0));
            if (dot > maxDot) {
                maxDot = dot;
                topFace = parseInt(face);
            }
        }

        return topFace;
    };
    // fonction de raycast pour les autres type de dés
    const getTopFaceRaycast = (diceType) => {

        if (!rigidBodyRef.current || !diceGroupRef.current) return null;

        // Récupération de la position actuelle du dé depuis le RigidBody
        const dicePos = rigidBodyRef.current.translation();
        // Création d'un vecteur pour le point d'origine du rayon (au-dessus du dé)
        const rayOrigin = new THREE.Vector3(dicePos.x, dicePos.y + 1, dicePos.z);
        // Direction du rayon : vers le bas
        const rayDirection = new THREE.Vector3(0, -1, 0);
        // Configuration du raycaster
        raycaster.set(rayOrigin, rayDirection);

        // On effectue l'intersection uniquement sur l'objet/dé (et ses descendants)
        const intersects = raycaster.intersectObject(diceGroupRef.current, true);

        if (intersects.length > 0) {
            // On récupère la première intersection (la plus proche)
            const hit = intersects[0].faceIndex;

            return faceIndexValue[diceType][hit];
        }
        return null;
    };

    return (
        <RigidBody
            ref={rigidBodyRef}
            colliders="hull"
            restitution={0.7}
            position={position}
            rotation={rotation}
            name="dice"
            onCollisionEnter={({ other }) => {
                if (other.rigidBodyObject) {
                    collisionSound(other.rigidBodyObject.name)
                }
            }}
            onSleep={() => {
                let result
                if(dice.type === "d4" || dice.type === "d6"){
                    result = getTopFace(rigidBodyRef.current, dice.type)
                } else {
                    result = getTopFaceRaycast(dice.type);
                }
                if (result !== null ) {
                    console.log("Résultat du lancer :", result);
                    // if (!scoreBord.includes(dice)) {
                    //     handleMovingDices(dice, result)
                    // }
                }
            }}
        >
            <group ref={diceGroupRef}>
            {
                dice.type === "d4" ?
                <FourFaces textureId={dice.map} />
                : dice.type === "d6" ?
                <SixFaces textureId={dice.map} />
                : dice.type === "d8" ?
                <HeightFaces textureId={dice.map} />
                : dice.type === "d10" ?
                <TenFaces textureId={dice.map} />
                : dice.type === "d100" ?
                <TenFacesDizaine textureId={dice.map} />
                : dice.type === "d12" ?
                <TwelveFaces textureId={dice.map} />
                : <TwentyFaces textureId={dice.map} />
            }
            </group>
        </RigidBody>
    )
}

export default function DicesWorld(){

    const {dicePool} = useContext(RollDiceContext)
    
    // Gestion des sons au contact
    const plastiqueContactRef = useRef(null)
    const woodContactRef = useRef(null)
    const [scoreBord, setScoreBord] = useState([])

    const collisionSound = useCallback((type) => {
        if (type === "dice" && plastiqueContactRef.current) {
            plastiqueContactRef.current.play()
        } else if (type === "piste" && woodContactRef.current) {
            woodContactRef.current.play()
        }
    }, [])
    
    useEffect(() => {
        plastiqueContactRef.current = new Audio("/sound/plast_collision.mp3");
        woodContactRef.current = new Audio("/sound/wood_collision.mp3");

        // Nettoyer les éléments audio lors du démontage du composant
        return () => {
            plastiqueContactRef.current = null;
            woodContactRef.current = null;
        };
    }, []);

    return (
        <>
            {/* Piste */}
            <RigidBody
                type="fixed"
                colliders="hull"
                restitution={0.1}
                rotation={[0, 0, 0]}
                position={[0, 0, 0]}
                name="piste"
            >
                <Piste />
            </RigidBody>
            <RigidBody
                type="fixed"
                colliders="hull"
                restitution={0.1}
                rotation={[0, 0, 0]}
                position={[0, 0, 0]}
            >
                <PisteExt />
            </RigidBody>
            <PlaneCollider />

            {/* Distributeur */}
            <RigidBody
                type="fixed"
                colliders="hull"
                restitution={0.1}
                rotation={[0, 0, 0]}
                position={[0, 0.8, 0]}
            >
                <Cone />
            </RigidBody>

            {/* Dices in pool */}
            {
                dicePool.map((dice, index) => {
                    const position = [
                        Math.floor(Math.random() * 2 ),
                        10 + (index * 0.4),
                        Math.floor(Math.random() * 2 )
                    ]
                    const rotation = [
                        Math.random() * Math.PI * 2,
                        Math.random() * Math.PI * 2,
                        Math.random() * Math.PI * 2
                    ]
                    return(
                        <Dice
                            key={dice.id}
                            dice={dice}
                            position={position}
                            rotation={rotation}
                            collisionSound={collisionSound}
                            scoreBord={scoreBord}
                            setScoreBord={setScoreBord}
                        />
                    )
                })
            }
            <Html>
                {
                    scoreBord.length > 0 &&
                    scoreBord.map((dice, index) => {
                        return(
                            <p key={index}>score: {dice.result}</p>
                        )
                    })
                }
                <div>
                </div>
            </Html>
        </>
    )
}