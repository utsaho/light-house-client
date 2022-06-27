import React from 'react';
import Footer from '../Shared/Footer';
import PageTitle from '../Shared/PageTitle';
import Navbar from './Navbar';

const Blogs = () => {
    const qna = [
        {
            question: 'How will you improve the performance of a React Application?',
            ans: `Before optimize a React application, we should understand how React updates its User Interface and how to measure an app’s performance. It then only updates the changed element in the actual DOM(Document Object Model). This process is called diffing. React use the concept of a virtual DOM to minimize the performance cost of re-rendering a webpage. This is great because it speeds up the UI render time. To optimize the performance of React Application, We can do the following techniques:
            1. Keep the components state local.
            2. Memoizing React components to prevent unnecessary re-renders.
            3. Lazy loading images in React.
            `
        },
        {
            question: 'What are the different ways to manage a state in a React application?',
            ans: `There are many type of ways to manage a state in a React App. But There are mainly four types of state to manage a state in a React Application:
            1. Local state: Local state is data we manage in one or another component.
            2. Global state: Global state is data we manage across multiple components.
            3. Server state: Data that comes from an external server that must be integrated with our UI state.
            4. URL state: Data that exists on our URLs, including the pathname and query parameters.`
        },
        {
            question: 'How does prototypical inheritance works?',
            ans: `Every object with its methods and properties contains an internal and hidden property known as [[Prototype]]. The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. So, the core idea of Prototypal Inheritance is that an object can point to another object and inherit all its properties. The main purpose is to allow multiple instances of an object to share common .`
        },
        {
            question: 'Why you do not set the state directly in React?',
            ans: `We do not set the state directly because, the performance cost of the website will be high. A component re-render every time to update the user interface. The process of this DOM property is called diffing. Every time whenever we change something in a components, The diffing algorithm help the DOM to identify the changes in that component and changed in the UI. so we do not set state directly because of better React application performance and help the diffing algorithm to identify the changes.`
        },
        {
            question: 'You have an array of products. Each product has a name, price, description, etc. How will you implement a search to find products by name?',
            ans: `It can be found in many ways. dynamic or static approach can be implemented.
            Suppose,I have to filter a product called 'iPhone' and array of products named 'products'. Now we can do filter operation in products array like: products.filter(product => product.name === 'iPhone'). This is the static approach and it return a object that is exactly matched.
            Now the dynamic way is, search by index. products.filter(product => product.name.includes('iPhone')) or products.filter(product => product.name.indexOf('iPhone')). both examples return an array.
            `
        },
        {
            question: 'What is a unit test? Why should write unite test?',
            ans: `This testing methodology is done during the development process by the software developers and sometimes QA staff.  The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages. The earlier a problem is identified, the fewer compound errors occur.
            Costs of fixing a problem early can quickly outweigh the cost of fixing it later.
            Debugging processes are made easier.
            Developers can quickly make changes to the code base.
            Developers can also re-use code, migrating it to new projects.
            `
        }
    ];

    return (
        <div className='w-100'>
            <Navbar />
            <PageTitle title='My Blogs' />
            <div className='py-10' style={{ background: 'linear-gradient(to right, rgb(58,117,183), rgb(118,80,175))' }}>
                <div className='mx-60'>
                    {
                        qna.map((q, index) => <div key={index} tabIndex="0" className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-1">
                            <input type="checkbox" className="peer" />
                            <div className="collapse-title text-2xl font-medium">
                                {index + 1}. {q.question}
                            </div>
                            <div className="collapse-content">
                                <p className='text-lg text-justify'>{q.ans}</p>
                            </div>
                        </div>)
                    }
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Blogs;