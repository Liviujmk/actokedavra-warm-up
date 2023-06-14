export const convertHobbiesInputToFormValue = (hobbies: string) => {
    // remove all spaces and then split to array\
    let hob: string[] = [];
    hob = hobbies.replace(/\s/g, '').split(',');
    hob[0] === '' ? hob.shift() : null;
    hob[hob.length - 1] === '' ? hob.pop() : null;
    return hob;
};
