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
            // 🐶 Generation 0 (Great-Grandparents)
            { id: 100, pids: [101], name: "Rex", title: "Great-Grandfather", img: "/pedigree/grandfather2.jpg", gender: "male", weight: '79 lbs', Age: 'Died at 13 years old', Vaccinations: 'Yes', Medical_History: 'None' },
            { id: 101, pids: [100], name: "Lady", title: "Great-Grandmother", img: "/pedigree/Lady2.jpeg", gender: "female", weight: '65 lbs', Age: 'Died at 12 years old', Vaccinations: 'Yes', Medical_History: 'None' },
        
            { id: 102, pids: [103], name: "Zeus", title: "Great-Grandfather", img: "/pedigree/Zeus.jpeg", gender: "male", weight: '75 lbs', Age: 'Died at 14 years old', Vaccinations: 'Yes', Medical_History: 'None' },
            { id: 103, pids: [102], name: "Chloe", title: "Great-Grandmother", img: "/pedigree/Rex.jpg", gender: "female", weight: '60 lbs', Age: 'Died at 13 years old', Vaccinations: 'Yes', Medical_History: 'None' },
            
            { id: 104, pids: [105], name: "Thor", title: "Great-Grandfather", img: "/pedigree/Grandfather1.jpg", gender: "male", weight: '70 lbs', Age: 'Died at 15 years old', Vaccinations: 'Yes', Medical_History: 'None' },
            { id: 105, pids: [104], name: "Maggie", title: "Great-Grandmother", img: "/pedigree/Grandmother1.jpeg", gender: "female", weight: '55 lbs', Age: 'Died at 14 years old', Vaccinations: 'Yes', Medical_History: 'None' },
        
            { id: 106, pids: [107], name: "Diesel", title: "Great-Grandfather", img: "/pedigree/Lady.webp", gender: "male", weight: '72 lbs', Age: 'Died at 11 years old', Vaccinations: 'Yes', Medical_History: 'None' },
            { id: 107, pids: [106], name: "Lucy", title: "Great-Grandmother", img: "/pedigree/Chloe.webp", gender: "female", weight: '58 lbs', Age: 'Died at 10 years old', Vaccinations: 'Yes', Medical_History: 'Diabetes' },
        
            // 🐶 Generation 1 (Grandparents)
            { id: 1, mid: 101, fid: 100, pids: [2], name: "Max", title: "Grandfather", img: "/pedigree/Max.jpg", gender: "male", weight: '80 lbs', Age: '10 years old (01/06/2015)', Vaccinations: 'Yes', Medical_History: 'None' },
            { id: 2, mid: 103, fid: 102, pids: [1], name: "Lucy", title: "Grandmother", img: "/pedigree/Bella.jpg", gender: "male", weight: '80 lbs', Age: '10 years old (01/06/2015)', Vaccinations: 'Yes', Medical_History: 'None' },
            { id: 3, mid: 105, fid: 104, pids: [4], name: "Rocky", title: "Grandfather", img: "/pedigree/Rocky.jpg", gender: "male", weight: '78 lbs', Age: '12 years old (01/06/2013)', Vaccinations: 'Yes', Medical_History: 'None' },
            { id: 4, mid: 107, fid: 106, pids: [3], name: "Luna", title: "Grandmother", img: "/pedigree/uncle1.jpg", gender: "female", weight: '68 lbs', Age: '13 years old (01/06/2012)', Vaccinations: 'Yes', Medical_History: 'Diabetes' },
        
            // 🐶 Generation 2 (Parents and Siblings)
            { id: 5, mid: 2, fid: 1, pids: [6], name: "Charlie", title: "Father", img: "/pedigree/Dad1.png", gender: "male", weight: '77 lbs', Age: '7 years old (01/06/2018)', Vaccinations: 'Yes', Medical_History: 'None' },
            { id: 6, mid: 4, fid: 3, pids: [5], name: "Daisy", title: "Mother", img: "/pedigree/Mom1.jpeg", gender: "female", weight: '64 lbs', Age: '8 years old (02/14/2017)', Vaccinations: 'Yes', Medical_History: 'None' },
        
            { id: 8, mid: 2, fid: 1, pids: [9], name: "Cooper", title: "Uncle", img: "/pedigree/aunt2.jpg", gender: "male", weight: '74 lbs', Age: '6 years old (01/06/2019)', Vaccinations: 'Yes', Medical_History: 'None' },
            { id: 9, pids: [8], name: "Sadie", title: "Aunt", img: "/pedigree/aunt1.webp", gender: "female", weight: '61 lbs', Age: '5 years old (02/14/2020)', Vaccinations: 'Yes', Medical_History: 'None' },
            { id: 10, mid: 4, fid: 3, pids: [11], name: "Duke", title: "Uncle", img: "/pedigree/uncle2.jpg", gender: "male", weight: '73 lbs', Age: '6 years old (06/14/2019)', Vaccinations: 'Yes', Medical_History: 'None' },
            { id: 11, pids: [10], name: "Molly", title: "Aunt", img: "/pedigree/Molly.jpeg", gender: "female", weight: '60 lbs', Age: '5 years old (02/14/2020)', Vaccinations: 'Yes', Medical_History: 'Diabetes' },
        
            // 🐶 Generation 3 (Puppies and Cousins)
            { id: 7, mid: 6, fid: 5, name: "Buddy", title: "Puppy", img: "/pedigree/puppy1.jpg", gender: "male", weight: '12 lbs', Age: '5 months old (09/01/2024)', Vaccinations: 'Yes', Medical_History: 'None' },
            { id: 12, mid: 6, fid: 5, name: "Bailey", title: "Sibling", img: "/pedigree/puppy2.avif", gender: "female", weight: '17 lbs', Age: '5 months old (09/01/2024)', Vaccinations: 'Yes', Medical_History: 'None' },
            { id: 13, mid: 6, fid: 5, name: "Milo", title: "Sibling", img: "/pedigree/puppy3.jpg", gender: "male", weight: '16 lbs', Age: '5 months old (09/01/2024)', Vaccinations: 'Yes', Medical_History: 'None' },
        
            // 🐾 Children of Cooper and Sadie (Cousins)
            { id: 40, mid: 9, fid: 8, name: "Rosie", title: "Cousin", img: "/pedigree/Rosie.jpg", gender: "female", weight: '10 lbs', Age: '6 months old (08/01/2024)', Vaccinations: 'No', Medical_History: 'None' },
            { id: 41, mid: 9, fid: 8, name: "Teddy", title: "Cousin", img: "/pedigree/Teddy.jpg", gender: "male", weight: '15 lbs', Age: '6 months old (08/01/2024)', Vaccinations: 'No', Medical_History: 'None' },
            { id: 42, mid: 9, fid: 8, name: "Ruby", title: "Cousin", img: "/pedigree/Bentley.jpg", gender: "female", weight: '12 lbs', Age: '6 months old (08/01/2024)', Vaccinations: 'No', Medical_History: 'None' },
        
            // 🐾 Children of Duke and Molly (Cousins)
            { id: 43, mid: 11, fid: 10, name: "Ollie", title: "Cousin", img: "/pedigree/Ollie.jpg", gender: "male", weight: '10 lbs', Age: '6 months old (08/15/2024)', Vaccinations: 'Yes', Medical_History: 'None' },
            { id: 44, mid: 11, fid: 10, name: "Lily", title: "Cousin", img: "/pedigree/Lily.avif", gender: "female", weight: '12 lbs', Age: '6 months old (08/15/2024)', Vaccinations: 'Yes', Medical_History: 'None' },
            { id: 45, mid: 11, fid: 10, name: "Bentley", title: "Cousin", img: "/pedigree/Ruby.jpg", gender: "male", weight: '15 lbs', Age: '6 months old (08/15/2024)', Vaccinations: 'Yes', Medical_History: 'Diabetes' },
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
