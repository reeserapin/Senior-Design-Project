import { useEffect, useRef } from "react";

const PetigreePage = () => {
    const treeRef = useRef(null);

    useEffect(() => {
        if (!treeRef.current || !window.FamilyTree) return;

        const options = getOptions();

        const chart = new window.FamilyTree(treeRef.current, {
            mouseScrool: window.FamilyTree.none,
            scaleInitial: 1, 
            siblingSeparation: 160, 
            subtreeSeparation: 180, 
            template: 'john',
            nodeBinding: {
                field_0: "name",
                field_1: "title",
                img_0: "img",
            },
            nodeSize: { width: 180, height: 180 }, 
        });

        chart.load([
            // 🐶 First Generation (Grandparents)
            { id: 1, pids: [2], name: "Max", title: "Grandfather", img: "/pedigree/Grandfather1.jpg", gender: 'male', breed: 'Labrador Retriever'},
            { id: 2, pids: [1], name: "Bella", title: "Grandmother", img: "/pedigree/Grandmother1.jpeg", gender: 'female', breed: 'Labrador Retriever' },

            { id: 3, pids: [4], name: "Rocky", title: "Grandfather", img: "/pedigree/grandfather2.jpg", gender: 'male', breed: 'Labrador Retriever' },
            { id: 4, pids: [3], name: "Luna", title: "Grandmother", img: "/pedigree/grandmother2.jpg", gender: 'female', breed: 'Labrador Retriever' },

            // 🐶 Second Generation (Parents)
            { id: 5, mid: 2, fid: 1, pids: [6], name: "Charlie", title: "Father", img: "/pedigree/Dad1.png", gender: 'male', breed: 'Labrador Retriever' },
            { id: 6, mid: 4, fid: 3, pids: [5], name: "Daisy", title: "Mother", img: "/pedigree/Mom1.jpeg", gender: 'female', breed: 'Labrador Retriever' },

            { id: 8, mid: 2, fid: 1, pids: [9], name: "Cooper", title: "Uncle", img: "/pedigree/uncle1.jpg", gender: 'male', breed: 'Labrador Retriever' },
            { id: 9, pids: [8], name: "Sadie", title: "Aunt", img: "/pedigree/aunt1.webp", gender: 'female', breed: 'Labrador Retriever' },

            { id: 10, mid: 4, fid: 3, pids: [11], name: "Duke", title: "Uncle", img: "/pedigree/uncle2.jpg", gender: 'male', breed: 'Labrador Retriever' },
            { id: 11, pids: [10], name: "Molly", title: "Aunt", img: "/pedigree/aunt2.jpg", gender: 'female', breed: 'Labrador Retriever' },

            // 🐶 Third Generation (Puppies)
            { id: 7, mid: 6, fid: 5, name: "Buddy", title: "Puppy", img: "/pedigree/puppy1.jpg", gender: 'male', breed: 'Labrador Retriever' },
            { id: 12, mid: 6, fid: 5, name: "Bailey", title: "Sibling", img: "/pedigree/puppy2.avif", gender: 'female', breed: 'Labrador Retriever' },
            { id: 13, mid: 6, fid: 5, name: "Milo", title: "Sibling", img: "/pedigree/puppy3.jpg", gender: 'male', breed: 'Labrador Retriever' },
        ]);

    }, []);

    function getOptions() {
        const searchParams = new URLSearchParams(window.location.search);
        var fit = searchParams.get('fit');
        var enableSearch = true;
        var scaleInitial = 1.5; 
        if (fit === 'yes') {
            enableSearch = false;
            scaleInitial = window.FamilyTree.match.boundary;
        }
        return { enableSearch, scaleInitial };
    }

    return (
        <div id="tree" ref={treeRef} style={{ width: "100%", height: "100vh" }}></div>
    );
};

export default PetigreePage;
