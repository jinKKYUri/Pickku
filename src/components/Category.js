import React, { useState } from 'react';
import '../styles/Category.css';

const categories = [
    { id: 1, name: '일러스트', href: '/category/1' },
    { id: 2, name: '버추얼 캐릭터', href: '/category/2' },
    { id: 3, name: 'Live2D', href: '/category/3' },
    { id: 4, name: '디자인', href: '/category/4' },
];
const Category = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <section style={{ top: 0 }} className="z-30 border border-transparent bg-white border-b border-b-gray-300">
            <div className="css-533jkm e1eaabms0">
                <nav className="css-70qvj9 e1p90o9s0">
                    <ul className="css-1o9jlhu e1p90o9s1">
                    {categories.map((category) => (
                        <li
                            key={category.id}
                            onMouseEnter={() => setHoveredIndex(category.id)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className="css-nw97ew e1neq6gu0">
                                <a className="css-1hix25n e1p90o9s2" href={category.link}>
                                <div className="css-1rps1q e1neq6gu1">
                                    <p className="css-b2qmlw" variant="body1" color="gray900">
                                    {category.name}
                                    </p>
                                    <div className="css-1yc2531 e1p90o9s5">
                                    <div className={
                                            hoveredIndex === category.id ? 'css-eisj2f e1p90o9s5' : 'css-uwwqev e1p90o9s5'
                                        }>
                                                    
                                        </div>
                                    </div>
                                </div>
                                </a>
                            </div>
                        </li>
                    ))}
                    </ul>
                </nav>
            </div>
        </section>
                    
                
    );
}
export default Category;