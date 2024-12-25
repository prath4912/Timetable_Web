#include<bits/stdc++.h>
#include<iostream>
using namespace std ;

class teacher
{
    public:
    string name ;
    string subject ;
    int div ;
    int year ;
    int numberofClasses ;
    int numberofClasses1 ;
    bool status [6][6]  ;
    teacher()
    {
        name = "x" ;
        subject = "" ;
        div = 0 ;
        year  =0 ;
        numberofClasses = 0 ;
        numberofClasses1 = 0 ;
        
        for(int i = 0 ; i<6 ;i++)
        {
            for(int j = 0 ; j<6 ;  j++)
            {
                status[i][j] = false  ;
            }
        }
    }

};

class subject
{
    public :

    string name ;
    int noClassPerWeek ;
    int noTeachears ;
    int noClassPerWeek1 ;
    int noTeachears1 ;
    teacher *tech1 ;

    public: 
    subject()
    {
        name = "temp" ;
        noClassPerWeek = 0 ;
        tech1 = nullptr ;
        noTeachears = 0 ;
        noTeachears1 = 0 ;
        noClassPerWeek1 = 0 ;

    }
};


class lab
{
    public :
    string name ;
    int nolabs ;
    int nolabs1 ;
    lab()
    {
        name = "none" ;
        nolabs = 0 ;
        nolabs = 0 ;
    }
};

class timetableobj
{
    public: 

    subject* sub1  ;
    teacher* tech1  ;
    lab*lab ;
    int status   = 0 ;
    timetableobj()
    {
        sub1 = nullptr ; 
        tech1 = nullptr ;
        lab= nullptr ;
        status = 0 ;
    }
};



void print ( vector<vector<timetableobj>>&time)
{
    vector<string>arr = {"Monday" , "Tuesday" , "Wednesday" , "Thursday" , "Friday" , "Saturday"} ;

    cout<<"Timetable"<<": "<<endl ;
    int wi = 10 ;
    string temp  = "Blank";
    cout<<setw(10)<<"Timeslots / Days";

    for(int i = 0 ; i<6  ; i++)
    {
        cout<<setw(wi)<<arr[i]<<" ";
        cout<<setw(wi)<<" " ;
    }
    cout<<endl ;


    for(int i = 0 ; i<6 ; i++)
    {
        cout<<setw(10)<<"10 - 11 " ;
        for(int j = 0 ; j<6 ; j++)
        {
            if(time[i][j].sub1!=nullptr)
            {
                cout<<setw(wi)<<time[i][j].sub1->name <<" " ;

                if(time[i][j].tech1)
                cout<<setw(wi)<<time[i][j].tech1->name ;
                else
                cout<<setw(wi)<<temp ;
            }
            else if(time[i][j].lab!=nullptr)
            {
                cout<<setw(wi)<<time[i][j].lab->name <<" " ;
                cout<<setw(wi)<<temp ;
            }else
            {
            cout<<setw(wi)<<temp<<" " ;
            cout<<setw(wi)<<temp ;
            }
        }
        cout<<endl ;
    }
    cout<<endl<<endl ;
}


int main()
{

    cout<<"Enter Number Of Divisions"<<endl ;
    int noOfDivisions = 4 ;
    int working_days = 6 ;
    int timeslots = 0 ;
    cout<<"Enter Number Of time Slots Per day" <<endl ;
    cin>>timeslots ;
    
    int noSubjects =  0 ;
    cout<<"Enter Total Number Of Subjects"<<endl;
    cin>>noSubjects ;

    subject* sub = new subject[noSubjects] ;

    for(int i = 0 ;i<noSubjects ; i++)
    {

        cout<<"Enter Data For "<<i+1<<"th subject"<<endl ;
        cout<<"Enter Name : "<<endl ;
        cin>>sub[i].name ;
        cout<<"Enter Number Of Classes Per Week : "<<endl ;
        cin>>sub[i].noClassPerWeek ;
        sub[i].noClassPerWeek1 = sub[i].noClassPerWeek  ;
        cout<<"Enter Number of teachers for that Subject : "<<endl ;
        cin>>sub[i].noTeachears ;
        sub[i].noTeachears1  =  sub[i].noTeachears ;
        

        int z = sub[i].noTeachears ;
        sub[i].tech1 = new teacher[z] ;

        cout<<"Enter Details for "<<z<<" teachers"<<endl ;
        for(int j = 0 ; j<z ; j++)
        {
           cout<<"Enter Name"<<endl ;
           cin>> sub[i].tech1[j].name ;
           cout<<"Enter Classes Per Week"<<endl ;
           cin>>sub[i].tech1[j].numberofClasses ;
           sub[i].tech1[j].numberofClasses1 = sub[i].tech1[j].numberofClasses ;
        }
    }

    int lab_no = 0 ;
    cout<<"Enter NUmber of Labs : "<<endl ;

    cin>>lab_no ;
    lab* l1 = new lab[lab_no] ;

    for(int i = 0 ; i<lab_no ; i++)
    {
        string name ;
        cout<<"Enter lab name" <<endl ;
        cin>>name ;
        l1[i].name = name ;
        cout<<"Enter Number Of labs:"<<endl ;
        cin>>l1[i].nolabs ;
        l1[i].nolabs1 = l1[i].nolabs ;
    }


    for(int v = 0 ; v<noOfDivisions ; v++)
    {
     for(int i = 0 ;i<noSubjects ; i++)
    {
        sub[i].noClassPerWeek = sub[i].noClassPerWeek1  ;
        sub[i].noTeachears  =  sub[i].noTeachears1 ;
        int z = sub[i].noTeachears ;
        for(int j = 0 ; j<z ; j++)
        {
           sub[i].tech1[j].numberofClasses = sub[i].tech1[j].numberofClasses1 ;
        }
    }

    for(int i = 0 ; i<lab_no ; i++)
    {
        l1[i].nolabs = l1[i].nolabs1 ;
    }

    vector<vector<timetableobj>>timetabledata( timeslots , vector<timetableobj>(6 )) ;
    
    int day = rand() % working_days ;

    while(true)
    {
        bool flag1 = true ;
        for( int i = 0 ; i <lab_no  ; i++ )
        {
            int count  = l1[i].nolabs ;
            while(count>0)
            {
                flag1 = false ;
                int flag = true ;

                for(int k = 0 ; k<working_days ; k = k+2)
                {
                    if(timetabledata[k][day].status == 0)
                    {
                        flag = false ;
                        break ;
                    }
                }

                if(flag)
                {
                    day = day==working_days-1 ? 0 : day+1 ;
                    continue;
                }

                int random ;
                do{
                    random = rand() % timeslots ;
                }while( ( (random&1)==1) || (timetabledata[random][day].status!=0) || (timetabledata[random+1][day].status!=0) ) ;

                timetabledata[random][day].lab = &l1[i] ;
                timetabledata[random][day].status = 1 ;

                timetabledata[random+1][day].lab = &l1[i] ;
                timetabledata[random+1][day].status = 1 ;

                count-- ;
                day = day== working_days-1 ? 0 : day+1 ;
                l1[i].nolabs-- ;
                break ;
            }
        }

        if(flag1)
        {
            break ;
        }
    }
    
    day =  rand() % working_days ;
    teacher *arr[noSubjects] ;
    for(int i = 0 ;i<noSubjects ; i++)
    {
        int z = sub[i].noTeachears ;
        cout<<"Following are teachers availble for a subject "<<sub[i].name<<" : "<<endl ;
        for(int j = 0 ; j<z ; j++)
        {
           cout<<j<<" "<<sub[i].tech1[j].name<<endl ;
        //    for(int h = 0 ; h<6 ;h++)
        //     {
        //         for(int c = 0 ; c<6 ;  c++)
        //         {
        //             cout<<sub[i].tech1[j].status[h][c]<<" "   ;
        //         }
        //         cout<<endl ;
        //     }
        }
        cout<<"Select One Of above for this division "<<endl ;
        int option ;
        cin>>option ;
        arr[i] = &sub[i].tech1[option] ;
    }

    // cout<<"in"<<endl ;
    while(true)
    {
        day =  rand() % working_days ;
        bool flag1 = true ;
        for( int i = 0 ; i<noSubjects  ; i++ )
        {
            // cout<<"arf"<<i<<" "<<endl ;
            day = rand() % working_days ;
            int count  = sub[i].noClassPerWeek ;

            while(count>0)
            {
                // cout<<"gsre"<<endl ;
                flag1 = false ;
                int flag = true ;
                for(int k = 0 ; k<timeslots ; k++)
                {
                    if(timetabledata[k][day].status == 0 && ((arr[i]->status[k][day])==false) )
                    {
                        flag = false ;
                        break ;
                    }
                }

                if(flag)
                {
                    day = day==working_days-1 ? 0 : day+1 ;
                    continue;
                }

                int random ;
                do{
                    random = rand() % timeslots;
                    // cout<<random<<" "<<arr[i]->status[random][day]<<endl ;
                }while( (timetabledata[random][day].status!=0) || (arr[i]->status[random][day])==true ) ;

                timetabledata[random][day].sub1 = &sub[i] ;
                timetabledata[random][day].status = 1 ;
                teacher*ptr = nullptr ;

                // for( int j = 0 ; j < sub[i].noTeachears ; j++)
                // {
                //     if( sub[i].tech1[j].numberofClasses > 0 )
                //     {
                //         timetabledata[random][day].tech1 = &sub[i].tech1[j] ;
                //         sub[i].tech1[j].numberofClasses-- ;
                //         break; 
                //     }
                // }
                timetabledata[random][day].tech1 = arr[i] ;
                arr[i]->numberofClasses-- ;
                arr[i]->status[random][day] = true ;
                count-- ;
                day = day== working_days-1 ? 0 : day+1 ;
                sub[i].noClassPerWeek-- ;
                // break;
                // print(timetabledata) ;
            }
        }


        if(flag1)
        {
            break ;
        }
    }
    // print(timetabledata) ;


    // cout<<"moving"<<endl<<endl ;
    // for(int i = 0 ; i< working_days ; i++)
    // {
    //    int low = 0  ;
    //    int high = timeslots-1 ;
    //    while (low<high)
    //    {
    //         while ( low<timeslots &&  timetabledata[low][i].status!=0     )
    //         {
    //             low++ ;
    //         }
                       
    //         while (high>=0 && (timetabledata[high][i].status==0 || timetabledata[high][i].lab!=nullptr ) )
    //         {
    //             high-- ;
    //         }
                        
    //         if(low< high && (timetabledata[low][i].tech1->status[high][i]==false) && (timetabledata[high][i].tech1->status[low][i]==false) )
    //         {
    //             swap(timetabledata[low][i] , timetabledata[high][i]) ;
    //         }
    //    }
    //     // print(timetabledata) ; 

    // }

    print(timetabledata) ; 
    }

    return 0 ;
}




// No same lectures on same day if lectures are less than working days
// trying to have only one techer to a subject of a class
//lecture and lab should be in above timesolts
