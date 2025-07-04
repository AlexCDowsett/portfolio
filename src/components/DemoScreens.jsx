import React, {useRef, useEffect} from 'react'
import {SpotLight, useAnimations, useGLTF, useTexture, useVideoTexture} from '@react-three/drei'
import {RepeatWrapping} from "three";
import gsap from 'gsap';
import {useGSAP} from "@gsap/react";
import {ScreenLocations, myProjects} from "../constants/index.js";

const DemoScreens = (props) => {

    const group = useRef();
    const {nodes, materials, animations} = useGLTF('/models/old_computers.glb')
    const {actions} = useAnimations(animations, group);

    // Load textures from myProjects (excluding the first project)
    const projectTextures = myProjects.slice(1).map(project => {
        try {
            const texture = useVideoTexture(project.texture, {
                muted: true,
                playsInline: true,
                crossOrigin: 'anonymous',
                loop: true,
                start: true,
                onError: (error) => {
                    // console.error(`Video texture error for ${project.title}:`, error);
                }
            });

            // Move mutations to useEffect below
            return texture;
        } catch (error) {
            return null;
        }
    });

    // Mutate projectTextures after they are loaded
    useEffect(() => {
        projectTextures.forEach((texture, i) => {
            if (texture) {
                const project = myProjects[i + 1]; // since you slice(1)
                const offset = project?.textureOffset || { x: 0, y: 0 };
                const repeat = project?.textureRepeat || { x: 1, y: 1 };
                texture.wrapS = texture.wrapT = RepeatWrapping;
                texture.offset.x = offset.x;
                texture.offset.y = offset.y;
                texture.repeat.x = repeat.x;
                texture.repeat.y = repeat.y;
            }
        });
    }, [projectTextures]);

    const txtStatic = useVideoTexture('/textures/static.mp4', {playsInline: true,});

    const txtBlue = useTexture('/textures/bluescreen2.png')
    txtBlue.wrapS = txtBlue.wrapT = RepeatWrapping;
    txtBlue.offset.x = -0.20;
    txtBlue.offset.y = -0.90;
    txtBlue.repeat.x = 4;
    txtBlue.repeat.y = 4;

    const txtAn = useTexture('/textures/Anthony.png')
    txtAn.wrapS = txtAn.wrapT = RepeatWrapping;
            txtAn.offset.x = 0.5;
            txtAn.offset.y = -2.67;
            txtAn.repeat.x = 4.0;
            txtAn.repeat.y = 5.5;

    // Mutate txtStatic after it is loaded
    useEffect(() => {
        if (txtStatic) {
            txtStatic.wrapS = txtStatic.wrapT = RepeatWrapping;
            txtStatic.offset.x = -0.15;
            txtStatic.offset.y = -1.4;
            txtStatic.repeat.x = 3.9;
            txtStatic.repeat.y = 3.5;
        }
    }, [txtStatic]);


    useGSAP(() => {
        let tl = gsap.timeline()
        .to(group.current.position,
                {
                    x: props.count ? '/=1.2': '+=0',
                    y: props.count ? '/=1.2': '+=0',
                    z: props.count ? '/=1.2': '+=0',
                    duration: 0.3,
                    ease: 'power1.out',
                })

        .to(group.current.position, {
            x: ScreenLocations[props.count].pX,
            y: ScreenLocations[props.count].pY,
            z: ScreenLocations[props.count].pZ,
            duration: 2,
            ease: 'power3.out',
        })

        let tl2 = gsap.timeline()

        .to(group.current.rotation,
            {
                x: props.count ? '/=1.2': '+=0',
                y: props.count ? '/=1.2': '+=0',
                z: props.count ? '/=1.2': '+=0',
                duration: 0.3,
                ease: 'power1.out',
            })

        .to(group.current.rotation, {
            x: ScreenLocations[props.count].rX,
            y: ScreenLocations[props.count].rY,
            z: ScreenLocations[props.count].rZ,
            duration: 2,
            ease: 'power3.out',
        })


    }, [props.count]);

    return (
        <group ref={group}{...props} dispose={null}>

            <ambientLight intensity={0.2}/>
            <directionalLight position={[5, 10, 0]} intensity={0.1} color={'white'}/>
            <directionalLight position={[0, 10, 0]} intensity={0.1} color={'white'}/>
            <SpotLight
                position={[0, 7, 1]}
                angle={4}
                penumbra={1}
                castShadow={true}
                intensity={3}
                decay={0.5}
                distance={25}/>
            <group name="Screen_4"
                   position={[0.27, 1.529, -2.613]}
                   scale={[1, 1, 1]}>

                <mesh
                    name="Object_206"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_206.geometry}
                    material={materials.Texture}
                />
                <mesh
                    name="Object_207"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_207.geometry}
                    material={materials.Screen}>
                    {projectTextures[3] && (
                        <meshBasicMaterial
                            map={projectTextures[3]}
                            toneMapped={false}
                        />
                    )}
                </mesh>
            </group>
            <group name="Screen_3"
                   position={[-1.43, 2.496, -1.8]}
                   rotation={[0, 1.002, 0]}
                   scale={[1, 1, 1]}>
                <mesh
                    name="Object_209"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_209.geometry}
                    material={materials.Texture}
                />
                <mesh
                    name="Object_210"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_210.geometry}
                    material={materials.Screen}>
                    {projectTextures[2] && (
                        <meshBasicMaterial
                            map={projectTextures[2]}
                            toneMapped={false}
                        />
                    )}
                </mesh>
            </group>
            <group name="Screen_Static"
                   position={[-2.731, 0.629, -0.522]}
                   rotation={[0, 1.087, 0]}>
                <mesh
                    name="Object_212"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_212.geometry}
                    material={materials.Texture}
                />
                <mesh
                    name="Object_213"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_213.geometry}
                    material={materials.Screen}>
                    <meshBasicMaterial map={txtBlue} toneMapped={false} />
                </mesh>
            </group>
            <group
                name="Screen_5"
                position={[1.845, 0.377, -1.771]}
                rotation={[0, -Math.PI / 9, 0]}
                scale={[1, 1, 1]}>
                <mesh
                    name="Object_215"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_215.geometry}
                    material={materials.Texture}
                />
                <mesh
                    name="Object_216"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_216.geometry}
                    material={materials.Screen}>
                    {projectTextures[4] && (
                        <meshBasicMaterial
                            map={projectTextures[4]}
                            toneMapped={false}
                        />
                    )}
                </mesh>
            </group>
            <group
                name="Screen_6"
                position={[3.11, 2.145, -0.18]}
                rotation={[0, -0.793, 0]}
                scale={[1, 1, 1]}>
                <mesh
                    name="Object_218"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_218.geometry}
                    material={materials.Texture}
                />
                <mesh
                    name="Object_219"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_219.geometry}
                    material={materials.Screen}>
                    {projectTextures[5] && (
                        <meshBasicMaterial
                            map={projectTextures[5]}
                            toneMapped={false}
                        />
                    )}
                </mesh>
            </group>
            <group
                name="Screen_1"
                position={[-3.417, 3.056, 1.303]}
                rotation={[0, 1.222, 0]}
                scale={[1, 1, 1]}>
                <mesh
                    name="Object_221"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_221.geometry}
                    material={materials.Texture}
                />
                <mesh
                    name="Object_222"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_222.geometry}
                    material={materials.Screen}>
                    {projectTextures[0] && (
                        <meshBasicMaterial
                            map={projectTextures[0]}
                            toneMapped={false}
                        />
                    )}
                </mesh>
            </group>
            <group name="Screen_2"
                   position={[-3.899, 4.287, -2.642]}
                   rotation={[0, 0.539, 0]}
                   scale={[1, 1, 1]}>
                <mesh
                    name="Object_224"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_224.geometry}
                    material={materials.Texture}
                />
                <mesh
                    name="Object_225"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_225.geometry}
                    material={materials.Screen}>
                    {projectTextures[1] && (
                        <meshBasicMaterial
                            map={projectTextures[1]}
                            toneMapped={false}
                        />
                    )}
                </mesh>
            </group>
            <group
                name="Screen_Blue"
                position={[0.992, 4.287, -4.209]}
                rotation={[0, 0.429, 0]}
                scale={[-1, 1, 1]}>
                <mesh
                    name="Object_227"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_227.geometry}
                    material={materials.Texture}
                />
                <mesh
                    name="Object_228"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_210.geometry}
                    rotation={[0, 0.5, 0]}
                    material={materials.Screen}>
                    <meshBasicMaterial
                        map={txtStatic}
                        toneMapped={false}/>
                </mesh>
            </group>
            <group
                name="Screen_7"
                position={[4.683, 4.29, -1.558]}
                rotation={[0, -Math.PI / 3, 0]}>
                <mesh
                    name="Object_230"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_230.geometry}
                    material={materials.Texture}
                />
                <mesh
                    name="Object_231"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_231.geometry}
                    material={materials.Screen}>
                    {/*<meshMatcapMaterial map={txtAn}/>*/}
                </mesh>

            </group>
            <mesh
                name="Object_4"
                castShadow
                receiveShadow
                geometry={nodes.Object_4.geometry}
                material={materials.Texture}
                position={[0.165, 0.794, -1.972]}
                rotation={[-0.544, 0.929, -1.119]}
                scale={0.5}
            />
            <mesh
                name="Object_6"
                castShadow
                receiveShadow
                geometry={nodes.Object_6.geometry}
                material={materials.Texture}
                position={[-2.793, 0.27, 1.816]}
                rotation={[-1.44, 1.219, 1.432]}
                scale={0.5}
            />
            <mesh
                name="Object_8"
                castShadow
                receiveShadow
                geometry={nodes.Object_8.geometry}
                material={materials.Texture}
                position={[-5.603, 4.615, -0.027]}
                rotation={[-1.955, 0.163, 1.202]}
                scale={0.5}
            />
            <mesh
                name="Object_10"
                castShadow
                receiveShadow
                geometry={nodes.Object_10.geometry}
                material={materials.Texture}
                position={[2.621, 1.985, -2.473]}
                rotation={[-0.419, -0.704, -1.851]}
                scale={0.5}
            />
            <mesh
                name="Object_12"
                castShadow
                receiveShadow
                geometry={nodes.Object_12.geometry}
                material={materials.Texture}
                position={[4.598, 3.459, 1.19]}
                rotation={[-1.236, -0.719, 0.48]}
                scale={0.5}
            />
            <mesh
                name="Object_14"
                castShadow
                receiveShadow
                geometry={nodes.Object_14.geometry}
                material={materials['Material.001']}
                scale={13}
            />
            <mesh
                name="Object_16"
                castShadow
                receiveShadow
                geometry={nodes.Object_16.geometry}
                material={materials.Texture}
                position={[0.63, 0, -3]}
                rotation={[0, 0.17, 0]}
                scale={1.52}
            />
            <mesh
                name="Object_18"
                castShadow
                receiveShadow
                geometry={nodes.Object_18.geometry}
                material={materials.Texture}
                position={[-0.186, 0, -2.962]}
                rotation={[0, -0.064, 0]}
                scale={1.52}
            />
            <mesh
                name="Object_20"
                castShadow
                receiveShadow
                geometry={nodes.Object_20.geometry}
                material={materials.Texture}
                position={[-2.36, 0.32, -2.018]}
                rotation={[0, 0.534, -Math.PI / 2]}
                scale={1.52}
            />
            <mesh
                name="Object_22"
                castShadow
                receiveShadow
                geometry={nodes.Object_22.geometry}
                material={materials.Texture}
                position={[-2.288, 1.56, -2.263]}
                rotation={[0, -0.012, -Math.PI / 2]}
                scale={1.52}
            />
            <mesh
                name="Object_24"
                castShadow
                receiveShadow
                geometry={nodes.Object_24.geometry}
                material={materials.Texture}
                position={[-2.424, 0.938, -2.247]}
                rotation={[Math.PI, -0.136, -Math.PI / 2]}
                scale={[-1.52, 1.52, 1.52]}
            />
            <mesh
                name="Object_26"
                castShadow
                receiveShadow
                geometry={nodes.Object_26.geometry}
                material={materials.Texture}
                position={[-2.195, 2.188, -1.867]}
                rotation={[Math.PI, -0.512, -Math.PI / 2]}
                scale={[-1.52, 1.52, 1.52]}
            />
            <mesh
                name="Object_28"
                castShadow
                receiveShadow
                geometry={nodes.Object_28.geometry}
                material={materials.Texture}
                position={[0.353, 2.352, -3.336]}
                rotation={[-0.255, 0, 0]}
            />
            <mesh
                name="Object_30"
                castShadow
                receiveShadow
                geometry={nodes.Object_30.geometry}
                material={materials.Texture}
                position={[0.183, 2.801, -2.854]}
                rotation={[0.093, 0.146, -0.014]}
            />
            <mesh
                name="Object_32"
                castShadow
                receiveShadow
                geometry={nodes.Object_32.geometry}
                material={materials.Texture}
                position={[-3.528, 0, 0.586]}
                rotation={[Math.PI, -1.085, Math.PI]}
                scale={1.52}
            />
            <mesh
                name="Object_34"
                castShadow
                receiveShadow
                geometry={nodes.Object_34.geometry}
                material={materials.Texture}
                position={[-2.896, 0.3, -1.466]}
                rotation={[Math.PI, -1.347, Math.PI / 2]}
                scale={1.52}
            />
            <mesh
                name="Object_36"
                castShadow
                receiveShadow
                geometry={nodes.Object_36.geometry}
                material={materials.Texture}
                position={[-3.528, 1.528, 0.586]}
                rotation={[0, 0.911, 0]}
                scale={1.52}
            />
            <mesh
                name="Object_38"
                castShadow
                receiveShadow
                geometry={nodes.Object_38.geometry}
                material={materials.Texture}
                position={[1.895, 0, -1.944]}
                rotation={[0, -0.436, 0]}
                scale={[1.5, 1, 1.5]}
            />
            <mesh
                name="Object_40"
                castShadow
                receiveShadow
                geometry={nodes.Object_40.geometry}
                material={materials.Texture}
                position={[3.423, 0, 0.005]}
                rotation={[-Math.PI, 1.127, -Math.PI]}
                scale={1.52}
            />
            <mesh
                name="Object_42"
                castShadow
                receiveShadow
                geometry={nodes.Object_42.geometry}
                material={materials.Texture}
                position={[3.224, 0, -0.804]}
                rotation={[0, -1.324, 0]}
                scale={1.52}
            />
            <mesh
                name="Object_44"
                castShadow
                receiveShadow
                geometry={nodes.Object_44.geometry}
                material={materials.Texture}
                position={[3.53, 1.834, 0.44]}
                rotation={[-Math.PI, 1.324, Math.PI / 2]}
                scale={1.52}
            />
            <mesh
                name="Object_46"
                castShadow
                receiveShadow
                geometry={nodes.Object_46.geometry}
                material={materials.Texture}
                position={[1.862, 1.61, -1.807]}
                rotation={[0, -Math.PI / 3, 0]}
            />
            <mesh
                name="Object_48"
                castShadow
                receiveShadow
                geometry={nodes.Object_48.geometry}
                material={materials.Texture}
                position={[4.086, 2.183, 2.41]}
                rotation={[0, -1.548, 1.571]}
                scale={1.52}
            />
            <mesh
                name="Object_50"
                castShadow
                receiveShadow
                geometry={nodes.Object_50.geometry}
                material={materials.Texture}
                position={[4.255, 0.943, 2.219]}
                rotation={[0, -1.002, Math.PI / 2]}
                scale={1.52}
            />
            <mesh
                name="Object_52"
                castShadow
                receiveShadow
                geometry={nodes.Object_52.geometry}
                material={materials.Texture}
                position={[4.314, 1.565, 2.343]}
                rotation={[Math.PI, 1.149, Math.PI / 2]}
                scale={[-1.52, 1.52, 1.52]}
            />
            <mesh
                name="Object_54"
                castShadow
                receiveShadow
                geometry={nodes.Object_54.geometry}
                material={materials.Texture}
                position={[3.87, 0.315, 2.35]}
                rotation={[3.142, 1.526, 1.571]}
                scale={[-1.52, 1.52, 1.52]}
            />
            <mesh
                name="Object_56"
                castShadow
                receiveShadow
                geometry={nodes.Object_56.geometry}
                material={materials.Texture}
                position={[3.954, 2.491, 1.607]}
                rotation={[0, -Math.PI / 3, 0]}
            />
            <mesh
                name="Object_58"
                castShadow
                receiveShadow
                geometry={nodes.Object_58.geometry}
                material={materials.Texture}
                position={[-3.79, 0, 1.656]}
                rotation={[0, 1.393, 0]}
                scale={[-1.52, 1.52, 1.52]}
            />
            <mesh
                name="Object_60"
                castShadow
                receiveShadow
                geometry={nodes.Object_60.geometry}
                material={materials.Texture}
                position={[-3.79, 1.528, 1.656]}
                rotation={[-Math.PI, -1.218, -Math.PI]}
                scale={[-1.52, 1.52, 1.52]}
            />
            <mesh
                name="Object_62"
                castShadow
                receiveShadow
                geometry={nodes.Object_62.geometry}
                material={materials.Texture}
                position={[-3.693, 0, 2.585]}
                rotation={[0, -1.568, 0]}
                scale={1.52}
            />
            <mesh
                name="Object_64"
                castShadow
                receiveShadow
                geometry={nodes.Object_64.geometry}
                material={materials.Texture}
                position={[-5.36, 2.183, 0.811]}
                rotation={[0, 0.772, Math.PI / 2]}
                scale={1.52}
            />
            <mesh
                name="Object_66"
                castShadow
                receiveShadow
                geometry={nodes.Object_66.geometry}
                material={materials.Texture}
                position={[-5.614, 0.943, 0.817]}
                rotation={[0, 1.318, 1.571]}
                scale={1.52}
            />
            <mesh
                name="Object_68"
                castShadow
                receiveShadow
                geometry={nodes.Object_68.geometry}
                material={materials.Texture}
                position={[-5.564, 1.565, 0.69]}
                rotation={[-Math.PI, -1.171, Math.PI / 2]}
                scale={[-1.52, 1.52, 1.52]}
            />
            <mesh
                name="Object_70"
                castShadow
                receiveShadow
                geometry={nodes.Object_70.geometry}
                material={materials.Texture}
                position={[-5.257, 0.315, 1.01]}
                rotation={[-Math.PI, -0.795, Math.PI / 2]}
                scale={[-1.52, 1.52, 1.52]}
            />
            <mesh
                name="Object_72"
                castShadow
                receiveShadow
                geometry={nodes.Object_72.geometry}
                material={materials.Texture}
                position={[-5.474, 2.794, 0.745]}
                rotation={[Math.PI, -1.155, Math.PI / 2]}
                scale={1.52}
            />
            <mesh
                name="Object_74"
                castShadow
                receiveShadow
                geometry={nodes.Object_74.geometry}
                material={materials.Texture}
                position={[-5.39, 4.034, 0.986]}
                rotation={[Math.PI, -0.609, Math.PI / 2]}
                scale={1.52}
            />
            <mesh
                name="Object_76"
                castShadow
                receiveShadow
                geometry={nodes.Object_76.geometry}
                material={materials.Texture}
                position={[-5.289, 3.412, 0.894]}
                rotation={[0, 0.757, Math.PI / 2]}
                scale={[-1.52, 1.52, 1.52]}
            />
            <mesh
                name="Object_78"
                castShadow
                receiveShadow
                geometry={nodes.Object_78.geometry}
                material={materials.Texture}
                position={[-5.696, 4.662, 0.718]}
                rotation={[0, 1.133, Math.PI / 2]}
                scale={[-1.52, 1.52, 1.52]}
            />
            <mesh
                name="Object_80"
                castShadow
                receiveShadow
                geometry={nodes.Object_80.geometry}
                material={materials.Texture}
                position={[-5.283, 0, -2.328]}
                rotation={[0, 0.755, 0]}
                scale={1.52}
            />
            <mesh
                name="Object_82"
                castShadow
                receiveShadow
                geometry={nodes.Object_82.geometry}
                material={materials.Texture}
                position={[-5.952, 0, -0.641]}
                rotation={[0, 0.953, 0]}
                scale={1.52}
            />
            <mesh
                name="Object_84"
                castShadow
                receiveShadow
                geometry={nodes.Object_84.geometry}
                material={materials.Texture}
                position={[-5.486, 0, -1.385]}
                rotation={[-Math.PI, -0.985, -Math.PI]}
                scale={1.52}
            />
            <mesh
                name="Object_86"
                castShadow
                receiveShadow
                geometry={nodes.Object_86.geometry}
                material={materials.Texture}
                position={[-4.476, 0, -2.749]}
                rotation={[-Math.PI, -0.568, -Math.PI]}
                scale={1.52}
            />
            <mesh
                name="Object_88"
                castShadow
                receiveShadow
                geometry={nodes.Object_88.geometry}
                material={materials.Texture}
                position={[-3.012, 0, -3.79]}
                rotation={[0, 0.597, 0]}
                scale={1.52}
            />
            <mesh
                name="Object_90"
                castShadow
                receiveShadow
                geometry={nodes.Object_90.geometry}
                material={materials.Texture}
                position={[-3.716, 0, -2.886]}
                rotation={[0, 0.644, 0]}
                scale={1.52}
            />
            <mesh
                name="Object_92"
                castShadow
                receiveShadow
                geometry={nodes.Object_92.geometry}
                material={materials.Texture}
                position={[-2.082, 0, -4.324]}
                rotation={[-Math.PI, -0.597, -Math.PI]}
                scale={1.52}
            />
            <mesh
                name="Object_94"
                castShadow
                receiveShadow
                geometry={nodes.Object_94.geometry}
                material={materials.Texture}
                position={[-1.016, 0, -4.489]}
                rotation={[0, 0.308, 0]}
                scale={1.52}
            />
            <mesh
                name="Object_96"
                castShadow
                receiveShadow
                geometry={nodes.Object_96.geometry}
                material={materials.Texture}
                position={[-0.084, 0, -5.026]}
                rotation={[-Math.PI, -0.039, -Math.PI]}
                scale={1.52}
            />
            <mesh
                name="Object_98"
                castShadow
                receiveShadow
                geometry={nodes.Object_98.geometry}
                material={materials.Texture}
                position={[-5.315, 1.833, -1.412]}
                rotation={[0, 1.062, Math.PI / 2]}
                scale={1.52}
            />
            <mesh
                name="Object_100"
                castShadow
                receiveShadow
                geometry={nodes.Object_100.geometry}
                material={materials.Texture}
                position={[-4.181, 1.833, -3.064]}
                rotation={[-Math.PI, -0.465, -Math.PI / 2]}
                scale={1.52}
            />
            <mesh
                name="Object_102"
                castShadow
                receiveShadow
                geometry={nodes.Object_102.geometry}
                material={materials.Texture}
                position={[-1.758, 1.833, -3.605]}
                rotation={[0, -1.165, Math.PI / 2]}
                scale={1.52}
            />
            <mesh
                name="Object_104"
                castShadow
                receiveShadow
                geometry={nodes.Object_104.geometry}
                material={materials.Texture}
                position={[-0.254, 1.833, -5.542]}
                rotation={[0, 1.553, 1.571]}
                scale={1.52}
            />
            <mesh
                name="Object_106"
                castShadow
                receiveShadow
                geometry={nodes.Object_106.geometry}
                material={materials.Texture}
                position={[-4.194, 1.836, -2.768]}
                rotation={[0, 0.655, Math.PI / 2]}
                scale={[-1.52, 1.52, 1.52]}
            />
            <mesh
                name="Object_108"
                castShadow
                receiveShadow
                geometry={nodes.Object_108.geometry}
                material={materials.Texture}
                position={[-5.283, 2.143, -2.328]}
                rotation={[-Math.PI, -0.755, -Math.PI]}
                scale={1.52}
            />
            <mesh
                name="Object_110"
                castShadow
                receiveShadow
                geometry={nodes.Object_110.geometry}
                material={materials.Texture}
                position={[-5.952, 2.143, -0.641]}
                rotation={[-Math.PI, -0.953, -Math.PI]}
                scale={1.52}
            />
            <mesh
                name="Object_112"
                castShadow
                receiveShadow
                geometry={nodes.Object_112.geometry}
                material={materials.Texture}
                position={[-5.486, 2.143, -1.385]}
                rotation={[0, 0.985, 0]}
                scale={1.52}
            />
            <mesh
                name="Object_114"
                castShadow
                receiveShadow
                geometry={nodes.Object_114.geometry}
                material={materials.Texture}
                position={[-4.476, 2.143, -2.749]}
                rotation={[0, 0.568, 0]}
                scale={1.52}
            />
            <mesh
                name="Object_116"
                castShadow
                receiveShadow
                geometry={nodes.Object_116.geometry}
                material={materials.Texture}
                position={[-3.012, 2.143, -3.79]}
                rotation={[-Math.PI, -0.597, -Math.PI]}
                scale={1.52}
            />
            <mesh
                name="Object_118"
                castShadow
                receiveShadow
                geometry={nodes.Object_118.geometry}
                material={materials.Texture}
                position={[-3.727, 2.143, -3.1]}
                rotation={[-Math.PI, -0.644, -Math.PI]}
                scale={1.52}
            />
            <mesh
                name="Object_120"
                castShadow
                receiveShadow
                geometry={nodes.Object_120.geometry}
                material={materials.Texture}
                position={[-2.082, 2.143, -4.324]}
                rotation={[0, 0.597, 0]}
                scale={1.52}
            />
            <mesh
                name="Object_122"
                castShadow
                receiveShadow
                geometry={nodes.Object_122.geometry}
                material={materials.Texture}
                position={[-1.016, 2.143, -4.489]}
                rotation={[-Math.PI, -0.308, -Math.PI]}
                scale={1.52}
            />
            <mesh
                name="Object_124"
                castShadow
                receiveShadow
                geometry={nodes.Object_124.geometry}
                material={materials.Texture}
                position={[-0.084, 2.143, -5.026]}
                rotation={[0, 0.039, 0]}
                scale={1.52}
            />
            <mesh
                name="Object_126"
                castShadow
                receiveShadow
                geometry={nodes.Object_126.geometry}
                material={materials.Texture}
                position={[-5.315, 3.976, -1.412]}
                rotation={[0, 1.062, Math.PI / 2]}
                scale={1.52}
            />
            <mesh
                name="Object_128"
                castShadow
                receiveShadow
                geometry={nodes.Object_128.geometry}
                material={materials.Texture}
                position={[-4.181, 3.976, -3.064]}
                rotation={[-Math.PI, -0.465, -Math.PI / 2]}
                scale={1.52}
            />
            <mesh
                name="Object_130"
                castShadow
                receiveShadow
                geometry={nodes.Object_130.geometry}
                material={materials.Texture}
                position={[-1.173, 3.976, -4.449]}
                rotation={[0, 0.168, Math.PI / 2]}
                scale={1.52}
            />
            <mesh
                name="Object_132"
                castShadow
                receiveShadow
                geometry={nodes.Object_132.geometry}
                material={materials.Texture}
                position={[-0.941, 3.976, -4.664]}
                rotation={[Math.PI, 0.018, -Math.PI / 2]}
                scale={1.52}
            />
            <mesh
                name="Object_134"
                castShadow
                receiveShadow
                geometry={nodes.Object_134.geometry}
                material={materials.Texture}
                position={[-4.194, 3.979, -2.768]}
                rotation={[0, 0.655, Math.PI / 2]}
                scale={[-1.52, 1.52, 1.52]}
            />
            <mesh
                name="Object_136"
                castShadow
                receiveShadow
                geometry={nodes.Object_136.geometry}
                material={materials.Texture}
                position={[-1.095, 4.291, -4.434]}
                rotation={[0, 0.357, 0]}
            />
            <mesh
                name="Object_138"
                castShadow
                receiveShadow
                geometry={nodes.Object_138.geometry}
                material={materials.Texture}
                position={[-5.246, 4.291, -1.466]}
                rotation={[0, 1.246, 0]}
            />
            <mesh
                name="Object_140"
                castShadow
                receiveShadow
                geometry={nodes.Object_140.geometry}
                material={materials.Texture}
                position={[5.531, 2.183, 0.174]}
                scale={[-1, 1, 1]}
            />
            <mesh
                name="Object_142"
                castShadow
                receiveShadow
                geometry={nodes.Object_142.geometry}
                material={materials.Texture}
                position={[5.786, 0.943, 0.18]}
                scale={[-1, 1, 1]}
            />
            <mesh
                name="Object_144"
                castShadow
                receiveShadow
                geometry={nodes.Object_144.geometry}
                material={materials.Texture}
                position={[5.736, 1.565, 0.053]}
                scale={[-1, 1, 1]}
            />
            <mesh
                name="Object_146"
                castShadow
                receiveShadow
                geometry={nodes.Object_146.geometry}
                material={materials.Texture}
                position={[5.428, 0.315, 0.373]}
                scale={[-1, 1, 1]}
            />
            <mesh
                name="Object_148"
                castShadow
                receiveShadow
                geometry={nodes.Object_148.geometry}
                material={materials.Texture}
                position={[5.646, 2.794, 0.107]}
                scale={[-1, 1, 1]}
            />
            <mesh
                name="Object_150"
                castShadow
                receiveShadow
                geometry={nodes.Object_150.geometry}
                material={materials.Texture}
                position={[5.562, 4.034, 0.348]}
                scale={[-1, 1, 1]}
            />
            <mesh
                name="Object_152"
                castShadow
                receiveShadow
                geometry={nodes.Object_152.geometry}
                material={materials.Texture}
                position={[5.461, 3.412, 0.256]}
                scale={[-1, 1, 1]}
            />
            <mesh
                name="Object_154"
                castShadow
                receiveShadow
                geometry={nodes.Object_154.geometry}
                material={materials.Texture}
                position={[5.868, 4.662, 0.081]}
                scale={[-1, 1, 1]}
            />
            <mesh
                name="Object_156"
                castShadow
                receiveShadow
                geometry={nodes.Object_156.geometry}
                material={materials.Texture}
                position={[4.856, 0, -2.541]}
                scale={[-1, 1, 1]}
            />
            <mesh
                name="Object_158"
                castShadow
                receiveShadow
                geometry={nodes.Object_158.geometry}
                material={materials.Texture}
                position={[5.525, 0, -0.854]}
                scale={[-1, 1, 1]}
            />
            <mesh
                name="Object_160"
                castShadow
                receiveShadow
                geometry={nodes.Object_160.geometry}
                material={materials.Texture}
                position={[5.059, 0, -1.597]}
                scale={[-1, 1, 1]}
            />
            <mesh
                name="Object_162"
                castShadow
                receiveShadow
                geometry={nodes.Object_162.geometry}
                material={materials.Texture}
                position={[4.05, 0, -2.962]}
                scale={[-1, 1, 1]}
            />
            <mesh
                name="Object_164"
                castShadow
                receiveShadow
                geometry={nodes.Object_164.geometry}
                material={materials.Texture}
                position={[2.585, 0, -4.002]}
                scale={[-1, 1, 1]}
            />
            <mesh
                name="Object_166"
                castShadow
                receiveShadow
                geometry={nodes.Object_166.geometry}
                material={materials.Texture}
                position={[3.289, 0, -3.098]}
                scale={[-1, 1, 1]}
            />
            <mesh
                name="Object_168"
                castShadow
                receiveShadow
                geometry={nodes.Object_168.geometry}
                material={materials.Texture}
                position={[1.655, 0, -4.536]}
                scale={[-1, 1, 1]}
            />
            <mesh
                name="Object_170"
                castShadow
                receiveShadow
                geometry={nodes.Object_170.geometry}
                material={materials.Texture}
                position={[0.59, 0, -4.701]}
                scale={[-1, 1, 1]}
            />
            <mesh
                name="Object_172"
                castShadow
                receiveShadow
                geometry={nodes.Object_172.geometry}
                material={materials.Texture}
                position={[4.888, 1.833, -1.624]}
                scale={[-1, 1, 1]}
            />
            <mesh
                name="Object_174"
                castShadow
                receiveShadow
                geometry={nodes.Object_174.geometry}
                material={materials.Texture}
                position={[3.754, 1.833, -3.277]}
                scale={[-1, 1, 1]}
            />
            <mesh
                name="Object_176"
                castShadow
                receiveShadow
                geometry={nodes.Object_176.geometry}
                material={materials.Texture}
                position={[1.332, 1.833, -3.817]}
                scale={[-1, 1, 1]}
            />
            <mesh
                name="Object_178"
                castShadow
                receiveShadow
                geometry={nodes.Object_178.geometry}
                material={materials.Texture}
                position={[3.767, 1.836, -2.98]}
                scale={[-1, 1, 1]}
            />
            <mesh
                name="Object_180"
                castShadow
                receiveShadow
                geometry={nodes.Object_180.geometry}
                material={materials.Texture}
                position={[4.856, 2.143, -2.541]}
                scale={[-1, 1, 1]}
            />
            <mesh
                name="Object_182"
                castShadow
                receiveShadow
                geometry={nodes.Object_182.geometry}
                material={materials.Texture}
                position={[5.525, 2.143, -0.854]}
                scale={[-1, 1, 1]}
            />
            <mesh
                name="Object_184"
                castShadow
                receiveShadow
                geometry={nodes.Object_184.geometry}
                material={materials.Texture}
                position={[5.059, 2.143, -1.597]}
                scale={[-1, 1, 1]}
            />
            <mesh
                name="Object_186"
                castShadow
                receiveShadow
                geometry={nodes.Object_186.geometry}
                material={materials.Texture}
                position={[4.05, 2.143, -2.962]}
                scale={[-1, 1, 1]}
            />
            <mesh
                name="Object_188"
                castShadow
                receiveShadow
                geometry={nodes.Object_188.geometry}
                material={materials.Texture}
                position={[2.585, 2.143, -4.002]}
                scale={[-1, 1, 1]}
            />
            <mesh
                name="Object_190"
                castShadow
                receiveShadow
                geometry={nodes.Object_190.geometry}
                material={materials.Texture}
                position={[3.3, 2.143, -3.312]}
                scale={[-1, 1, 1]}
            />
            <mesh
                name="Object_192"
                castShadow
                receiveShadow
                geometry={nodes.Object_192.geometry}
                material={materials.Texture}
                position={[1.655, 2.143, -4.536]}
                scale={[-1, 1, 1]}
            />
            <mesh
                name="Object_194"
                castShadow
                receiveShadow
                geometry={nodes.Object_194.geometry}
                material={materials.Texture}
                position={[0.59, 2.143, -4.701]}
                scale={[-1, 1, 1]}
            />
            <mesh
                name="Object_196"
                castShadow
                receiveShadow
                geometry={nodes.Object_196.geometry}
                material={materials.Texture}
                position={[4.888, 3.976, -1.624]}
                scale={[-1, 1, 1]}
            />
            <mesh
                name="Object_198"
                castShadow
                receiveShadow
                geometry={nodes.Object_198.geometry}
                material={materials.Texture}
                position={[3.754, 3.976, -3.277]}
                scale={[-1, 1, 1]}
            />
            <mesh
                name="Object_200"
                castShadow
                receiveShadow
                geometry={nodes.Object_200.geometry}
                material={materials.Texture}
                position={[0.746, 3.976, -4.662]}
                scale={[-1, 1, 1]}
            />
            <mesh
                name="Object_202"
                castShadow
                receiveShadow
                geometry={nodes.Object_202.geometry}
                material={materials.Texture}
                position={[3.767, 3.979, -2.98]}
                scale={[-1, 1, 1]}
            />
            <mesh
                name="Object_204"
                castShadow
                receiveShadow
                geometry={nodes.Object_204.geometry}
                material={materials.Texture}
                position={[3.198, 4.291, -3.092]}
                rotation={[0, -0.563, 0]}
                scale={[-1, 1, 1]}
            />
        </group>
    )
}

useGLTF.preload('/models/old_computers.glb')

export default DemoScreens
